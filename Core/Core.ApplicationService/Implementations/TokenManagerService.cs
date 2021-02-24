using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Core.DomainModel.Entities;
using Core.DomainModel.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementations
{
    public class TokenManagerService : ITokenManagerService
    {

        #region Properties

        private readonly IDistributedCache _cache;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly TokenSetting _tokenSetting;

        #endregion /Properties

        #region Constructors

        public TokenManagerService(IDistributedCache cache,
                IHttpContextAccessor httpContextAccessor,
                IOptions<TokenSetting> tokenSetting)
        {
            this._cache = cache;
            this._httpContextAccessor = httpContextAccessor;
            this._tokenSetting = tokenSetting.Value;
        }

        #endregion /Constructors

        #region Methods

        public async Task<bool> IsCurrentActiveToken()
            => await IsActiveAsync(GetCurrentAsync());

        public async Task DeactivateCurrentAsync()
            => await DeactivateAsync(GetCurrentAsync());

        public AuthenticationToken GetAuthenticationToken(User user)
        {
            DateTime expirationTime = DateTime.UtcNow.AddMinutes(double.Parse(this._tokenSetting.AccessExpiration));
            string token = GenerateJwtToken(user, expirationTime);
            return new AuthenticationToken(user, token, expirationTime);
        }

        public int GetCurrentUserId()
        {
            var claims = _httpContextAccessor.HttpContext.User.Claims;
            return int.Parse(claims.FirstOrDefault(s => s.Type == "UserId")?.Value);
        }

        private async Task<bool> IsActiveAsync(string token)
            => await _cache.GetStringAsync(GetKey(token)) == null;

        private async Task DeactivateAsync(string token) =>
            await _cache.SetStringAsync(GetKey(token), " ", new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(double.Parse(this._tokenSetting.AccessExpiration))
            });

        private string GetCurrentAsync()
        {
            var authorizationHeader = _httpContextAccessor.HttpContext.Request.Headers["authorization"];

            return authorizationHeader == StringValues.Empty
                ? string.Empty
                : authorizationHeader.Single().Split(" ").Last();
        }

        private string GenerateJwtToken(User user, DateTime expirationTime)
        {
            //var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._tokenSetting.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature); //  HmacSha256Signature);
            var claims = new List<Claim> { new Claim("UserId", user.Id.ToString()) };
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Issuer = this._appSettings.Issuer,
            //    Audience = subSystems.Value,
            //    //Subject = new ClaimsIdentity(new Claim[]
            //    //{
            //    //    new Claim(ClaimTypes.Name, "crud")
            //    //}),
            //    Subject = new ClaimsIdentity(claims),
            //    Expires = DateTime.UtcNow.AddMinutes(double.Parse(this._appSettings.AccessExpiration)),
            //    SigningCredentials = credentials
            //};
            //string token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            var tokeOptions = new JwtSecurityToken(
                issuer: this._tokenSetting.Issuer,
                audience: this._tokenSetting.Audience,
                // audience: subSystems.Value,
                claims: claims,
                expires: expirationTime,
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        private static string GetKey(string token) => $"tokens:{token}:deactivated";

        #endregion /Methods

    }
}
