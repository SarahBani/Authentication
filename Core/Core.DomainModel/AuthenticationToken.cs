using Core.DomainModel.Entities;
using System;

namespace Core.DomainModel
{
    public class AuthenticationToken
    {

        #region Properties

        public int Id { get; private set; }

        public string Username { get; private set; }

        public string Token { get; private set; }

        public DateTime TokenExpiration { get; private set; }

        #endregion /Properties

        #region Constructors

        public AuthenticationToken(User user, string token, DateTime tokenExpiration)
        {
            this.Id = user.Id;
            this.Username = user.Username;
            this.Token = token;
            this.TokenExpiration = tokenExpiration;
        }

        #endregion /Constructors

    }
}
