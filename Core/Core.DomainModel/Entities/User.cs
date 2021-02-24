using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.DomainModel.Entities
{
    public class User : BaseEntity<int>
    {

        [Required]
        [StringLength(50, ErrorMessage = "Username cannot be longer than 50 characters!")]
        public string Username { get; set; }

        [Required]
        [JsonIgnore]
        public string Password { get; set; }

        [Required]
        public string FullName { get; set; }

        public string Avatar { get; set; }

        public string Position { get; set; }

    }
}
