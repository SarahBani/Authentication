using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Core.DomainModel.Entities;
using Core.DomainModel.Settings;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementations
{
    public class AuthenticationService : IAuthenticationService
    {

        #region Properties

        private readonly IList<User> _users = new List<User>()
        {
            new User(){ Id = 1, Username="john", Password=Utility.HashPassword("123"), FullName="John Doe", Avatar="img_avatar1.png", Position="Team Leader" },
            new User(){ Id = 2, Username="kathy", Password=Utility.HashPassword("123"), FullName="Kathy Smith", Avatar="img_avatar4.png", Position="Scrum Master"},
            new User(){ Id = 3, Username="roger", Password=Utility.HashPassword("123"), FullName="Roger Smith", Avatar="img_avatar3.png", Position="Senior Software Developer"},
            new User(){ Id = 4, Username="megan", Password=Utility.HashPassword("123"), FullName="Megan Mayor", Avatar="img_avatar6.png", Position="Software Developer"},
            new User(){ Id = 5, Username="bill", Password=Utility.HashPassword("123"), FullName="Bill Smith", Avatar="img_avatar2.png", Position="Software Developer"},
            new User(){ Id = 6, Username="sam", Password=Utility.HashPassword("123"), FullName="Sam Mayor", Avatar="img_avatar5.png", Position="Software Developer"}
        };

        private readonly ITokenManagerService _tokenManagerService;

        #endregion /Properties

        #region Constructors

        public AuthenticationService(ITokenManagerService tokenManagerService)
        {
            this._tokenManagerService = tokenManagerService;
        }

        #endregion /Constructors

        #region Methods

        public async Task<TransactionResult> LoginAsync(string username, string password)
        {
            try
            {
                var user = await GetByLoginAsync(username, password);
                if (user == null)
                {
                    throw new CustomException(ExceptionKey.AuthenticationFailed);
                }
                var authenticationToken = this._tokenManagerService.GetAuthenticationToken(user);
                return new TransactionResult(authenticationToken);
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public Task<User> GetCurrentUserAsync()
        {
            return Task.Delay(3000)
                .ContinueWith(q =>
                {
                    int userId = this._tokenManagerService.GetCurrentUserId();
                    return this._users.SingleOrDefault(q => q.Id.Equals(userId));
                });
        }

        public async Task<TransactionResult> LogoutAsync()
        {
            await Task.Delay(3000);
            await this._tokenManagerService.DeactivateCurrentAsync();
            return new TransactionResult();
        }

        private Task<User> GetByLoginAsync(string username, string password)
        {
            return Task.Delay(3000)
                 .ContinueWith(q => this._users.SingleOrDefault(q =>
                     q.Username.Equals(username, StringComparison.OrdinalIgnoreCase) &&
                     q.Password.Equals(Utility.HashPassword(password))));
        }

        private TransactionResult GetTransactionException(Exception exception)
        {
            if (exception is CustomException)
            {
                return new TransactionResult(exception as CustomException);
            }
            else
            {
                return new TransactionResult(new CustomException(exception));
            }
        }

        #endregion /Methods

    }
}
