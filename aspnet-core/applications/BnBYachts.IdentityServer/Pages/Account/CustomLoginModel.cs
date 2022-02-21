using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Account.Web.Pages.Account;

namespace BnBYachts.Pages.Account
{
   
        public class CustomLoginModel : LoginModel
        {
            public CustomLoginModel(
                Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider schemeProvider,
                Microsoft.Extensions.Options.IOptions<Volo.Abp.Account.Web.AbpAccountOptions> accountOptions, IConfiguration configuration)
                : base(schemeProvider, accountOptions,configuration)
            {
            }

        public override Task<IActionResult> OnPostAsync(string action)
        {
            //TODO: Add logic
            return base.OnPostAsync(action);
        }
    }
    
}
