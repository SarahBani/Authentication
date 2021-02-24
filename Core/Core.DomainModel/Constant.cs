namespace Core.DomainModel
{
    public static class Constant
    {

        #region AppSettings

        public const string AppSettings_TokenSetting = "TokenSetting";

        public const string AppSettings_RedisConnecionString = "redis:connectionString";

        #endregion /AppSettings

        #region RegularExpressions

        public const string RegularExpression_ValidCharacters = @"^[^\/,.^]+$";
     
        #endregion /RegularExpressions

        #region Exceptions

        public const string Exception_HasError = "An error has occured!";
        public const string Exception_AuthenticationFailed = "Username or password is incorrect!";

        #endregion /Exceptions

    }
}
