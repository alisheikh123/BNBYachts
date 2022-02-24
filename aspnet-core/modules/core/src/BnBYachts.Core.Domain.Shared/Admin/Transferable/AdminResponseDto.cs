using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.Admin.Transferable
{
    public class AdminResponseDto
    {
        public string Message { get; set; } = string.Empty;
        public int ResponseCode { get; set; } = 0;
        public bool Status { get; set; } = true;
        public object Data { get; set; } = null;
    }
}
