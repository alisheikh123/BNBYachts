using Microsoft.Extensions.Configuration;
using BnBYachts.Data.Model;
using BnBYachts.Dto;
using BnBYachts.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Services
{
    public class ForgetPasswordVerifierAppService : CrudAppService<ForgetPasswordVerifier, ForgetPasswordVerifierDto, Guid, PagedAndSortedResultRequestDto, ForgetPasswordVerifierDto>, IForgetPasswordVerifierAppService
    {
        //private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        
        public ForgetPasswordVerifierAppService(IRepository<ForgetPasswordVerifier, Guid> repository, UserManager<IdentityUser> userManager, IConfiguration configuration)
          : base(repository)
        {
            //_userManager = userManager;
            _configuration = configuration;

        }


        [HttpGet("api/ForgotPassword")]
        public async Task<string> ForgotPassword(string Email)
        {

    //        //var user = await _userManager.FindByEmailAsync(Email);
    //        if (user == null)
    //            return "Invalid Request";
    //        //var token = await _userManager.GeneratePasswordResetTokenAsync(user);
    //        var param = new Dictionary<string, string>
    //{
    //    {"token", token },
    //    {"email", Email }
    //};
    //        var emailConfig = _configuration["EmailConfiguration"];
    //        var callback = QueryHelpers.AddQueryString(emailConfig, param);
            //var message = new Message(new string[] { user.Email }, "Reset password token", callback, null);
            //await _emailSender.SendEmailAsync(message);
            return "Success";
        }
    }
}
