using BnByachts.NotificationHub.Services;
using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.DTO;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Transferable;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;

namespace BnBYachts.Core.Managers
{
    public class AppUserManager : DomainService, IAppUserManager
    {
        private readonly IRepository<IdentityUser, Guid> _repository;
        private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager;
        private readonly IMailer _mailer;
        private readonly ResponseDTO _respone = new ResponseDTO();


        public AppUserManager(IRepository<IdentityUser, Guid> repository, Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager, IMailer mailer)
        {
            _repository = repository;
            _userManager = userManager;
            _mailer = mailer;
        }
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId)
        {
            var user = await _repository.GetAsync(res => res.Id == userId.Value).ConfigureAwait(false);
            string profileImage = null;
            if (user.GetProperty<string>(UserConstants.ImagePath) != null)
            {
                profileImage = user.GetProperty<string>(UserConstants.ImagePath).ToString();
            }
            var data = UserFactory.Contruct(user.Id.ToString(), user.Name, profileImage, user.Roles, user.CreationTime);
            return data;
        }

        public async Task<ResponseDTO> RegisterUser(string firstName, string lastName, string emailAddress, string userName, string plainPassword, string emailActivationLink, DateTime dob)
        {
            try
            {
                IdentityUser user = new IdentityUser(Guid.NewGuid(), userName, emailAddress);
                user.Name = firstName + " " + lastName;
                user.SetProperty(UserConstants.DOB, dob);
                var result = await _userManager.CreateAsync(user, plainPassword);
                if (result.Succeeded)
                {
                    var isRoleAssigned = await _userManager.AddToRoleAsync(user, "User");
                    if (isRoleAssigned.Succeeded)
                    {
                        await SendEmailToAskForEmailConfirmationAsync(user);
                        _respone.Message = "Account created successfuly";
                        _respone.Status = true;
                    }
                }
                else
                {
                    _respone.Message = result.Errors.ToList().FirstOrDefault().Description;
                    _respone.Status = false;
                }
                return _respone;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task SendEmailToAskForEmailConfirmationAsync(Volo.Abp.Identity.IdentityUser user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            user.SetProperty(UserConstants.EmailConfirmationToken, token);
            await _repository.UpdateAsync(user);

            string baseUrl = "http://44.197.69.129:8080/activate-account";
            //string baseUrl = "http://localhost:4200/activate-account";
            var queryParams = new Dictionary<string, string>()
            {
            {"username", user.UserName },
            {"id", token },
            };
            var url = QueryHelpers.AddQueryString(baseUrl, queryParams);
            string body = $"<h4>Click on the link below to confirm your account </h4><span> <a href = '{url}'> Click Me </a></span>";
            await _mailer.SendEmailAsync(user.Email, "Email Confirmation", body, true);
        }

        public async Task<bool> ConfirmEmail(string username, string token)
        {
            var users = await _repository.FirstOrDefaultAsync(x => x.Email == username);
            var finalToken = token.Replace(" ", "+");
            if (users != null)
            {
                if (users.GetProperty<String>(UserConstants.EmailConfirmationToken) == finalToken)
                {
                    var result = await _userManager.ConfirmEmailAsync(users, finalToken);
                    if (result.Succeeded)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }

        public async Task ResendEmail(string username)
        {
            var user = await _repository.FirstOrDefaultAsync(x => x.Email == username);
            await SendEmailToAskForEmailConfirmationAsync(user);
        }
    }
}
