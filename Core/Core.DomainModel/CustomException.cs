using System;

namespace Core.DomainModel
{
    public enum ExceptionKey
    {
        NotDefined = -1,
        AuthenticationFailed,
    }

    public class CustomException : Exception
    {

        #region Properties

        public string CustomMessage { get; private set; }

        public ExceptionContent Content { get; private set; }

        #endregion /Properties

        #region Constructors

        public CustomException(Exception exception)
        {
            var baseException = exception.GetBaseException();
            this.Content = new ExceptionContent(baseException.Message,
                baseException.Source,
                baseException.StackTrace);
        }

        public CustomException(ExceptionKey exceptionKey, params object[] args)
        {
            this.CustomMessage = string.Format(GetMessage(exceptionKey), args);
        }

        public CustomException(string message)
        {
            this.CustomMessage = message;
        }

        #endregion /Constructors

        #region Methods

        private string GetMessage(ExceptionKey exceptionKey)
        {
            switch (exceptionKey)
            {
                case ExceptionKey.AuthenticationFailed:
                    return Constant.Exception_AuthenticationFailed;
                case ExceptionKey.NotDefined:
                default:
                    return Constant.Exception_HasError;
            }
        }

        #endregion /Methods

    }
}