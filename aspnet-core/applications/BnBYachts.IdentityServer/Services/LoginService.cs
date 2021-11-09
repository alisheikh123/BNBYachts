using BnBYachts.Controller;
using System;
using System.Threading.Tasks;
using Volo.Abp.Account.Web.Pages.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Volo.Abp.Account.Web;
using BnBYachts.Interfaces.IdentityInterface;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Volo.Abp.Settings;
using Volo.Abp.Account.Settings;
using Volo.Abp;
using Volo.Abp.Validation;
using System.Diagnostics;
using BnBYachts.Services.DTO;
using Microsoft.AspNetCore.WebUtilities;

namespace BnBYachts.Services
{
    public class LoginService : LoginModel,ILoginService
    {
         
        public LoginService(IAuthenticationSchemeProvider schemeProvider, IOptions<AbpAccountOptions> accountOptions, IOptions<IdentityOptions> identityOptions) : base(schemeProvider, accountOptions, identityOptions)
        {

        }
       

        public async Task Login(string username, string password)
        {
            this.LoginInput = new LoginInputModel();
            this.LoginInput.UserNameOrEmailAddress = "admin";
            this.LoginInput.Password = "1q2w3E*";
            var response = await this.OnPostAsync("");
             await CheckLocalLoginAsync();
            ValidateModel();
            await ReplaceEmailToUsernameOfInputIfNeeds(username);
            var result = await this.SignInManager.PasswordSignInAsync(username,password, false, false);

            if (result.RequiresTwoFactor)
            {
                RedirectToPage("./SendSecurityCode", new
                {
                    returnUrl = ReturnUrl,
                    returnUrlHash = ReturnUrlHash,
                    rememberMe = LoginInput.RememberMe
                });
            }

            if (result.IsLockedOut)
            {
                Alerts.Warning(L["UserLockedOutMessage"]);
                Page();
            }

            if (result.IsNotAllowed)
            {
                Alerts.Warning(L["LoginIsNotAllowed"]);
                Page();
            }

            if (!result.Succeeded)
            {
                Alerts.Danger(L["InvalidUserNameOrPassword"]);
                Page();
            }

            var user = await UserManager.FindByNameAsync(username) ??
                 await UserManager.FindByEmailAsync(username);

            Debug.Assert(user != null, nameof(user) + " != null");

            RedirectSafely(ReturnUrl, ReturnUrlHash);
        }


        public async Task<object> UserInfo(string UserId)
        {

            var user = await UserManager.FindByIdAsync(UserId);
            return user;
        }
        protected virtual async Task CheckLocalLoginAsync()
        {
            if (!await SettingProvider.IsTrueAsync(AccountSettingNames.EnableLocalLogin).ConfigureAwait(false))
            {
                throw new UserFriendlyException(L["LocalLoginDisabledMessage"]);
            }
        }
        protected virtual async Task ReplaceEmailToUsernameOfInputIfNeeds(string username)
        {
            if (!ValidationHelper.IsValidEmailAddress(username))
            {
                return;
            }

            var userByUsername = await UserManager.FindByNameAsync(username);
            if (userByUsername != null)
            {
                return;
            }

            var userByEmail = await UserManager.FindByEmailAsync(username);
            if (userByEmail == null)
            {
                return;
            }

            username = userByEmail.UserName;
        }


        public async Task<string> EmailVerification(ForgotPasswordDto forgotPasswordDto)
        {
            Guid obj = Guid.NewGuid();
            var user = await UserManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
                return "Invalid Request";
            var token = await UserManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string>
                {
                    {"token", token },
                    {"email", forgotPasswordDto.Email }
                };
            var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);
            //var messages = new Message<>(new string[] { user.Email }, "Reset password token", callback, null);
            //await _emailSender.SendEmailAsync(messages);
            string message = "Success";
            return callback;
        }
    }
}
