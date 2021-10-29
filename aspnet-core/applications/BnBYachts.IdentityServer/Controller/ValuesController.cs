using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Volo.Abp.Account.Web;
using Volo.Abp.Account.Web.Pages.Account;


namespace BnBYachts.Controller
{


    class  temp: LoginModel
    {
        public temp(IAuthenticationSchemeProvider schemeProvider, IOptions<AbpAccountOptions> accountOptions, IOptions<IdentityOptions> identityOptions) : base(schemeProvider, accountOptions, identityOptions)
        {
        }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public SignInManager<IdentityUser> SignInManager { get; set; }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
           var response=await SignInManager.PasswordSignInAsync("admin", "1q2w3E*", false,false);

            return new string[] { "value1", "value2" };
        }
    }
}
