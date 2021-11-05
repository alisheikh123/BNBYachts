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


    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ILoginService _ILoginservice;
        public ValuesController(ILoginService ILoginservices)
        {
            _ILoginservice = ILoginservices;
        }
       

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
           await _ILoginservice.Login();

            return new string[] { "value1", "value2" };
        }
    }

    public interface ILoginService {
        Task Login();
    }

    public class LoginService : LoginModel,ILoginService
    {

        public LoginService(IAuthenticationSchemeProvider schemeProvider, IOptions<AbpAccountOptions> accountOptions, IOptions<IdentityOptions> identityOptions) : base(schemeProvider, accountOptions, identityOptions)
        {

        }

        public async Task Login()
        {

            var response  = this.SignInManager.PasswordSignInAsync("admin", "1q2w3E*", false, false);
            await Task.CompletedTask;

    }
    }
}