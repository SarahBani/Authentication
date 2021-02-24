using System;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserInterface.Models;

namespace AuthenticationInterface.Controllers
{
    [Route("Auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        #region Properties

        public IAuthenticationService _authenticationService { get; set; }

        #endregion /Properties

        #region Constructors

        public AuthenticationController(IAuthenticationService userService)
        {
            this._authenticationService = userService;
        }

        #endregion /Constructors

        #region Actions

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<TransactionResult> LoginAsync([FromBody] LoginModel model)
        {
            return await this._authenticationService.LoginAsync(model.Username, model.Password);
        }

        //[AllowAnonymous]
        //[HttpPost("refresh-token")]
        //public IActionResult RefreshToken()
        //{
        //    var refreshToken = Request.Cookies["refreshToken"];
        //    var response = this._authenticationService.RefreshToken(refreshToken, GetIPAddress());

        //    if (response == null)
        //    {
        //        return Unauthorized(new { message = "Invalid token" });
        //    }

        //    SetTokenCookie(response.RefreshToken);

        //    return Ok(response);
        //}

        //[HttpPost("revoke-token")]
        //public IActionResult RevokeToken([FromBody] string token)
        //{
        //    // accept token from request body or cookie
        //    token = token ?? Request.Cookies["refreshToken"];

        //    if (string.IsNullOrEmpty(token)) { 
        //        return BadRequest(new { message = "Token is required" });
        //    }

        //    var response = this._authenticationService.RevokeToken(token, GetIPAddress());

        //    if (!response) { 
        //        return NotFound(new { message = "Token not found" });
        //    }

        //    return Ok(new { message = "Token revoked" });
        //}

        [Authorize]
        [HttpGet("GetProfile")]
        public async Task<ProfileModel> GetProfileAsync()
        {
            var user = await this._authenticationService.GetCurrentUserAsync();
            return new ProfileModel(user);
        }

        [Authorize]
        [HttpGet("Logout")]
        public async Task<TransactionResult> LogoutAsync()
        {
            return await this._authenticationService.LogoutAsync();
        }

        //private void SetTokenCookie(string token)
        //{
        //    var cookieOptions = new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Expires = DateTime.UtcNow.AddMinutes(double.Parse(this._appSettings.AccessExpiration))
        //};
        //    Response.Cookies.Append("refreshToken", token, cookieOptions);
        //}

        private string GetIPAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        #endregion /Actions

    }
}
