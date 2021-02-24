namespace Core.DomainModel
{
  public  class ExceptionContent
    {

        #region Properties

        public string Message { get;private set; }

        public string Source { get; private set; }

        public string StackTrace { get; private set; }

        #endregion /Properties

        #region Constructors

        public ExceptionContent(string message, string source, string stackTrace) 
        {
            this.Message = message;
            this.Source = source;
            this.StackTrace = stackTrace;
        }

        #endregion /Constructors

    }
}
