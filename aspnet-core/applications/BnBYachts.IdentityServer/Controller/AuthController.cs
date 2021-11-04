using BnBYachts.Interfaces.IdentityInterface;
using BnBYachts.Services.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet]
        //[Authorize]
        [Route("UserInfo/{userId}")]
        public async Task<object> UserInfo(string userId)
        {
            var userInfo = await _ILoginservice.UserInfo(userId);

            return userInfo;
        }
      


        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var response = await _ILoginservice.EmailVerification(forgotPasswordDto);


            return Ok(response);
        }


    }
}
