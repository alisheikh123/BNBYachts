using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BnBYachts.Services.DTO
{
    public class ForgotPasswordDto
    {
      
        public string Email { get; set; }
      
        public string ClientURI { get; set; }
        //public string CallBack { get; set; }

        //public UserManager<IdentityUser> User { get; set; }
    }
}
