using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Microsoft.AspNetCore.Authorization;
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

        #endregion /Actions

    }
}
