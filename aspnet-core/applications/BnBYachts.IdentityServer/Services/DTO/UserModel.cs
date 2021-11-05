using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BnBYachts.Services.DTO
{
    public class UserModel
    {
       
        public string email { get; set; }
     
        public string Password { get; set; }

        public bool isRemember { get; set; }
    }
}
