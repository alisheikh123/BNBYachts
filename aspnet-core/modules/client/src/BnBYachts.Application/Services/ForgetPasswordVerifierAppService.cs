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
using Volo.Abp.Modularity;
using Volo.Abp.Users;
using static Volo.Abp.Identity.Settings.IdentitySettingNames;
using static Volo.Abp.Identity.IdentityPermissions;
using Volo.Abp.Emailing;
using Volo.Abp.Identity;
using IdentityServer4.Models;
using BnBYachts.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using System.Text.RegularExpressions;

namespace BnBYachts.Services
{
    
    public class ForgetPasswordVerifierAppService : CrudAppService<ForgetPasswordVerifier, ForgetPasswordVerifierDto, Guid, PagedAndSortedResultRequestDto, ForgetPasswordVerifierDto>, IForgetPasswordVerifierAppService
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly IdentityUserManager _userManager;
        private readonly IRepository<ForgetPasswordVerifier, Guid> _Repository;
        




        public ForgetPasswordVerifierAppService(IRepository<ForgetPasswordVerifier, Guid> repository, IConfiguration configuration,IEmailSender emailSender,IdentityUserManager userManager)
          : base(repository)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailSender = emailSender;
            _Repository = repository;

        }


        [HttpGet]
        [Route("forgot/{Email}")]
        public async Task<bool> ForgotPassword(string Email)
        {
            var dbContext = await _Repository.GetDbContextAsync();
            ForgetPasswordVerifier forgetPasswordVerifier = new ForgetPasswordVerifier();
            var user = await _userManager.FindByEmailAsync(Email).ConfigureAwait(false);
           
            if (user == null)
                return false;
            else 
            {
                Guid obj = Guid.NewGuid();
                var uniqueId = obj.ToString();
                string urlLink = "http://localhost:4200/auth/reset-password/"+uniqueId;
                forgetPasswordVerifier.UserId = user.Id.ToString();
                forgetPasswordVerifier.UniqueId = uniqueId.ToString();
                await _Repository.InsertAsync(forgetPasswordVerifier);
                
                var fromAddress = new MailAddress("ali.raza@techverx.com", "BNBYechet");
                var toAddress = new MailAddress("Alisheikh14125@gmail.com", "Ali");
                const string fromPassword = "Alisheikh@123";
                const string subject = "Email to Reset the Password of BNBYechets!";
                string body = "if You 've lost your password or wish to reset it use the link  below  to get started  "+ urlLink;

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
                return true;
            }
            
        }

        [HttpGet]
        [Route("verifyLink/{uniqueId}")]
        public async Task<string> VerifyLink(string uniqueId)
        {
            var userId = _Repository.Where(x=>x.UniqueId==uniqueId).Select(x=>x.UserId).FirstOrDefault();
            return userId;
           
        }


        [HttpGet]
        [Route("reset/")]
        public async Task<bool> ResetPassword(string userId, string Password)
        {
           

                var resetpasswordUserInfo = await _userManager.FindByIdAsync(userId);
                var rsult = await _userManager.RemovePasswordAsync(resetpasswordUserInfo);
                var ress = await _userManager.AddPasswordAsync(resetpasswordUserInfo,Password);
                return true;
        }
      

    }
}
