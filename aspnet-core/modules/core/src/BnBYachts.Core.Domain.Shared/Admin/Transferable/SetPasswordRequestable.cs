using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.Admin.Transferable
{
    public class SetPasswordRequestable
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
