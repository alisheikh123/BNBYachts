namespace BnBYachts.Core.Shared.Dto
{
    public class ResponseDto
    {
        public string Message { get; set; } = string.Empty;
        public int ResponseCode { get; set; } = 0;
        public bool Status { get; set; } = true;
        public object Data { get; set; } = null;
    }
}
