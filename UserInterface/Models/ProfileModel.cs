using Core.DomainModel.Entities;
using System.ComponentModel.DataAnnotations;

namespace UserInterface.Models
{
    public class ProfileModel
    {

        #region Properties

        [Required]
        public string FullName { get; set; }

        public string Avatar { get; set; }

        public string Position { get; set; }

        #endregion /Properties

        #region Constructors

        public ProfileModel(User user)
        {
            this.FullName = user.FullName;
            this.Avatar = user.Avatar;
            this.Position = user.Position;
        }

        #endregion /Constructors

    }
}
