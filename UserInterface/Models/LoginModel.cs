using Core.DomainModel;
using System.ComponentModel.DataAnnotations;

namespace UserInterface.Models
{
    public class LoginModel
    {

        #region Properties

        [Required]
        [RegularExpression(Constant.RegularExpression_ValidCharacters)]
        public string Username { get; set; }

        [Required]
        [RegularExpression(Constant.RegularExpression_ValidCharacters)]
        public string Password { get; set; }

        #endregion /Properties

    }
}
