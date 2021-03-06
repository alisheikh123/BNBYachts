using BnBYachts.Core.Data.Model.ForgetPassword;
using BnBYachts.Core.Dto;
using BnBYachts.Core.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Microsoft.Extensions.Configuration;

namespace BnBYachts.Core.Services
{
    public class ForgetService : CrudAppService<ForgetPasswordVerifier, ForgetPasswordVerifierDto, Guid, PagedAndSortedResultRequestDto, ForgetPasswordVerifierDto>, IForgetService
    {
        
        private readonly IdentityUserManager _userManager;
        private readonly IRepository<ForgetPasswordVerifier, Guid> _Repository;
        private readonly IConfiguration _config;
        public ForgetService(IRepository<ForgetPasswordVerifier, Guid> repository, IdentityUserManager userManager,IConfiguration config)
          : base(repository)
        {
            _userManager = userManager;
            _Repository = repository;
            _config = config;
        }
        [HttpGet]
        public async Task<bool> ForgotPassword(string Email)
        {
            var rootUrl = _config.GetSection("AppUrl:ClientUrl").Value;
            var forgetPasswordVerifier = new ForgetPasswordVerifier();
            var user = await _userManager.FindByEmailAsync(Email).ConfigureAwait(false);

            if (user == null)
                return false;
            else
            {
                var obj = Guid.NewGuid();
                var uniqueId = obj.ToString();
                var urlLink = rootUrl+"/auth/reset-password/" + uniqueId;
                forgetPasswordVerifier.UserId = user.Id.ToString();
                forgetPasswordVerifier.UniqueId = uniqueId.ToString();
                await _Repository.InsertAsync(forgetPasswordVerifier);

                var fromAddress = new MailAddress("ali.raza@techverx.com", "BNBYechet");
                var toAddress = new MailAddress(Email, "Ali");
                const string fromPassword = "Alisheikh@123";
                const string subject = "Email to Reset the Password of BNBYechets!";
                string body = "if You 've lost your password or wish to reset it use the link  below  to get started  " + urlLink;

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
        public async Task<string> VerifyLink(string uniqueId)
        {
            var userId = _Repository.Where(x => x.UniqueId == uniqueId).Select(x => x.UserId).FirstOrDefault();
            return userId;

        }
        [HttpGet]
        public async Task<bool> ResetPassword(string userId, string Password)
        {
            var resetpasswordUserInfo = await _userManager.FindByIdAsync(userId);
            await _userManager.RemovePasswordAsync(resetpasswordUserInfo);
            await _userManager.AddPasswordAsync(resetpasswordUserInfo, Password);
            return true;
        }


    }
}

