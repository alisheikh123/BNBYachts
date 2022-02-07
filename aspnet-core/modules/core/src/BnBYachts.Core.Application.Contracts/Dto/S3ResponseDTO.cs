using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Dto
{
   public class S3ResponseDTO
    {
        public string FullPath { get; set; }
        public string KeyName { get; set; }
        public string BucketName { get; set; }
    }
}
