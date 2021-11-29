using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.DTO
{
    public class ResponseDTO
    {
        public string Message { get; set; }
        public int ResponseCode { get; set; }
        public bool Status { get; set; }
        public object Data { get; set; }

        public ResponseDTO()
        {
            Status = true;
            Data = null;
            Message = string.Empty;
            ResponseCode = 0;
        }
    }
}
