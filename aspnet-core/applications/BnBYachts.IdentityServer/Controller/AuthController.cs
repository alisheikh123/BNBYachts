using BnBYachts.Interfaces.IdentityInterface;
using BnBYachts.Services.DTO;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ILoginService _ILoginservice;
        public AuthController(ILoginService ILoginservices)
        {
            _ILoginservice = ILoginservices;
        }

        //[HttpGet]
        //public async Task<IEnumerable<string>> Get(string username,string password)
        //{
        //    await _ILoginservice.Login(username,password);

        [HttpGet]
            {

            }


    }
}
