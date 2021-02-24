using Core.ApplicationService.Contracts;
using Core.ApplicationService.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DependecyInjection
{
    public static class StartupExtention
    {

        public static IServiceCollection SetInjections(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped(typeof(ITokenManagerService), typeof(TokenManagerService));
            services.AddScoped(typeof(IAuthenticationService), typeof(AuthenticationService));    

            return services;
        }

    }
}
