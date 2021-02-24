namespace Core.DomainModel
{
    public class TransactionResult
    {

        #region Properties

        public bool IsSuccessful { get; private set; }

        public string ErrorMessage { get; private set; }

        public object Content { get; private set; }

        #endregion /Properties

        #region Constructors

        public TransactionResult(object content = null)
        {
            this.IsSuccessful = true;
            this.ErrorMessage = string.Empty;
            this.Content = content;
        }

        public TransactionResult(CustomException exception, object content = null)
        {
            this.IsSuccessful = false;
            this.ErrorMessage = exception.CustomMessage;
            this.Content = content;
        }

        #endregion /Constructors


    }
}