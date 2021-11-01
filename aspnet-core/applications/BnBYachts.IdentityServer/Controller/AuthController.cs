using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BnBYachts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
            public SignInManager<IdentityUser> SignInManager { get; set; }


        // GET: api/<ValuesController>
        [HttpGet]
            public async Task<IEnumerable<string>> Get()
            {
                var response = await SignInManager.PasswordSignInAsync("admin", "1q2w3E*", false, false);

                return new string[] { "value1", "value2" };
            }
    }
}
