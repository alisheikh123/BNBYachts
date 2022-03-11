
using Microsoft.AspNetCore.Http;

namespace BnBYachts.EventBusShared.Contracts
{
    public  interface IS3FileContract:IContractable
    {
        public IFormFile File { get; set; }
        public string SubFolder { get; set; }
        public string ChildFolder { get; set; }
    }

    public class S3FileContract:IS3FileContract
    {
        public IFormFile File { get; set; }
        public string SubFolder { get; set; }
        public string ChildFolder { get; set; }
    }

}
