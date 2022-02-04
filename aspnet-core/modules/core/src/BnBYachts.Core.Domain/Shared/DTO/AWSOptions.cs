using Amazon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.DTO
{
    public class AWSOptions
    {
        public dynamic AWSBucketRegion { get; set; }
        public string AWSSecretKey { get; set; }
        public string AWSAccessKey { get; set; }
        public string AWSBucketName { get; set; }
        public string AWSDefaultFolder { get; set; }

    }
}
