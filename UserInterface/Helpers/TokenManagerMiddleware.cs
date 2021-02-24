using Core.ApplicationService.Contracts;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;

namespace UserInterface.Helpers
{
    public class TokenManagerMiddleware : IMiddleware
    {

        #region Properties

        private readonly ITokenManagerService _tokenManagerService;

        #endregion /Properties

        #region Constructors

        public TokenManagerMiddleware(ITokenManagerService tokenManagerService)
        {
            _tokenManagerService = tokenManagerService;
        }

        #endregion /Constructors

        #region Methods

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (await _tokenManagerService.IsCurrentActiveToken())
            {
                await next(context);
                return;
            }
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        }

        #endregion /Methods

    }
}
