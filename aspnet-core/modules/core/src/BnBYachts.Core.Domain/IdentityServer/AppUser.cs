using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.IdentityServer
{
    public class AppUser
    {
        public string ImagePath { get; set; }
        public string EmailConfirmationToken { get; set; }
        public DateTime DOB { get; set; }
        public string About { get; set; }
        public bool IsInitialLogin { get; set; }
        public bool IsActive { get; set; }
    }
}
 