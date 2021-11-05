using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BnBYachts.Services.DTO
{
    public class UserDetail
    {
        public object UserId { get; set; }
        public string Name { get; set; }
        public string ProfilePicture { get; set; }
        public string Token { get; set; }
        public int expiry { get; set; }
        public bool IsSwitch { get; set; }

    }
}
