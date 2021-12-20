using Newtonsoft.Json;

namespace BnBYachts.Shared.Model
{
    public class ResponseMessage
    {
        public string Message { get; set; }
        public int Code { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}