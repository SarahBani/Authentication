using Core.DomainModel;
using Core.DomainModel.Entities;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IAuthenticationService
    {
        Task<TransactionResult> LoginAsync(string username, string password);

        Task<User> GetCurrentUserAsync();

        Task<TransactionResult> LogoutAsync();

    }
}
