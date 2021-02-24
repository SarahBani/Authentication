
namespace Core.DomainModel.Settings
{
    public class WebSiteEmail : ISetting
    {

        public string Name { get; set; }

        public string Address { get; set; }

        public string Host { get; set; }

        public short Port { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

    }
}
