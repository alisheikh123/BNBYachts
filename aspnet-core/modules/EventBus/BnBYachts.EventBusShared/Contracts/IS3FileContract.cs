
using Microsoft.AspNetCore.Http;

namespace BnBYachts.EventBusShared.Contracts
{
    public  interface IS3FileContract:IContractable
    {
        public byte[] File { get; set; }
        public string SubFolder { get; set; }
        public string ChildFolder { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
    }

    public class S3FileContract:IS3FileContract
    {
        public byte[] File { get; set; }
        public string SubFolder { get; set; }
        public string ChildFolder { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
    }

}
