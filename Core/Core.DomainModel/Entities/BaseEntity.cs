using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class BaseEntity<TKey>
    {

        [Required]
        public TKey Id { get; set; }

    }
}
