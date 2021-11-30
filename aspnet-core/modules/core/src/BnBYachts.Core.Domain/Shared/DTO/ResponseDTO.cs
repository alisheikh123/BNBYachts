namespace BnBYachts.Core.Shared.Dto
{
    public class ResponseDto
    {
        public string Message { get; set; }
        public int ResponseCode { get; set; }
        public bool Status { get; set; }
        public object Data { get; set; }

        public ResponseDto()
        {
            Status = true;
            Data = null;
            Message = string.Empty;
            ResponseCode = 0;
        }
    }
}
