using Core.DomainModel;
using Core.DomainModel.Entities;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface ITokenManagerService
    {
        Task<bool> IsCurrentActiveToken();

        Task DeactivateCurrentAsync();

        AuthenticationToken GetAuthenticationToken(User user);

        int GetCurrentUserId();

    }
}
