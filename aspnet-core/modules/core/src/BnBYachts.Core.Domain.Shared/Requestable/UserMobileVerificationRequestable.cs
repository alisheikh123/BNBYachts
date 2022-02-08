using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.Requestable
{
    public class UserMobileVerificationRequestable
    {
            public string UserId { get; set; }
            public string Phone { get; set; }
            public string OtpCode { get; set; }
    }
}
