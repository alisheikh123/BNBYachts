using BnBYachts.Core.Shared;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Volo.Abp;
using Volo.Abp.Account.Settings;
using Volo.Abp.Account.Web;
using Volo.Abp.Account.Web.Pages.Account;
using Volo.Abp.Auditing;
using Volo.Abp.Data;
using Volo.Abp.Security.Claims;
using Volo.Abp.Settings;
using Volo.Abp.Uow;
using Volo.Abp.Validation;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace BnBYachts.Pages.Account
{
    public class LoginModel : AccountPageModel
    {
        [HiddenInput]
        [BindProperty(SupportsGet = true)]
        public string ReturnUrl { get; set; }

        [HiddenInput]
        [BindProperty(SupportsGet = true)]
        public string ReturnUrlHash { get; set; }

        [BindProperty]
        public LoginInputModel LoginInput { get; set; }

        public bool EnableLocalLogin { get; set; }
        public string BaseUrl { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public bool IsActive { get; set; }
        public bool IsAccountLock { get; set; }
        public bool IsCredentialsWrong { get; set; }

        //TODO: Why there is an ExternalProviders if only the VisibleExternalProviders is used.
        public IEnumerable<ExternalProviderModel> ExternalProviders { get; set; }
        public IEnumerable<ExternalProviderModel> VisibleExternalProviders => ExternalProviders.Where(x => !String.IsNullOrWhiteSpace(x.DisplayName));

        public bool IsExternalLoginOnly => EnableLocalLogin == false && ExternalProviders?.Count() == 1;
        public string ExternalLoginScheme => IsExternalLoginOnly ? ExternalProviders?.SingleOrDefault()?.AuthenticationScheme : null;
        //private readonly IConfiguration _configuration;


        //Optional IdentityServer services
        //public IIdentityServerInteractionService Interaction { get; set; }
        //public IClientStore ClientStore { get; set; }
        //public IEventService IdentityServerEvents { get; set; }

        protected IAuthenticationSchemeProvider _schemeProvider;
        protected AbpAccountOptions _accountOptions;
        private readonly IConfiguration _configuration;
        private readonly EventBusDispatcher _eventBusDispatcher;
        public LoginModel(
            IAuthenticationSchemeProvider schemeProvider,
            IOptions<AbpAccountOptions> accountOptions, IConfiguration configuration, EventBusDispatcher eventBusDispatcher)
        {
            _schemeProvider = schemeProvider;
            _accountOptions = accountOptions.Value;
            _configuration = configuration;
            _eventBusDispatcher = eventBusDispatcher;
        }

        public virtual async Task<IActionResult> OnGetAsync()
        {
            if (ReturnUrl != null)
            {
                this.BaseUrl = GetDomainUrl(ReturnUrl);
            }
            var schemes = await _schemeProvider.GetAllSchemesAsync();

            var providers = schemes
                .Where(x => x.DisplayName != null || x.Name.Equals(_accountOptions.WindowsAuthenticationSchemeName, StringComparison.OrdinalIgnoreCase))
                .Select(x => new ExternalProviderModel
                {
                    DisplayName = x.DisplayName,
                    AuthenticationScheme = x.Name
                })
                .ToList();

            EnableLocalLogin = await SettingProvider.IsTrueAsync(AccountSettingNames.EnableLocalLogin);

            ExternalProviders = providers.ToArray();

            if (IsExternalLoginOnly)
            {
                throw new NotImplementedException();
            }

            return Page();
        }

        //[UnitOfWork] //TODO: Will be removed when we implement action filter
        public virtual async Task<IActionResult> OnPostAsync(string action)
        {

            await CheckLocalLoginAsync();

            ValidateModel();

            await ReplaceEmailToUsernameOfInputIfNeeds();
            var user = await UserManager.FindByNameAsync(LoginInput.UserNameOrEmailAddress) ??
                       await UserManager.FindByEmailAsync(LoginInput.UserNameOrEmailAddress);
            if (user == null)
            {
                Alerts.Danger(L["The username or email you have enter doesn't exist."]);
                return Page();

            }
            IsEmailConfirmed = user.EmailConfirmed;
            IsActive = user.GetProperty<bool>(UserConstants.IsActive);
            if (IsActive == false)
            {
                Alerts.Danger(L["Your Account is Suspended."]);
                return Page();
            }
            if (IsEmailConfirmed == false)
            {
                Alerts.Danger(L["Your account is not verified.Please check your email and verify from them."]);
                return Page();
            }
            var result = await SignInManager.PasswordSignInAsync(
                LoginInput.UserNameOrEmailAddress,
                LoginInput.Password,
                true,
                lockoutOnFailure: true
            ).ConfigureAwait(false);


            if (result.RequiresTwoFactor)
            {
                return RedirectToPage("./SendSecurityCode", new
                {
                    returnUrl = ReturnUrl,
                    returnUrlHash = ReturnUrlHash,
                    rememberMe = LoginInput.RememberMe
                });
            }
            if (result.IsLockedOut)
            {
                IsAccountLock = result.IsLockedOut;
                await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
                {
                    From = _configuration.GetSection("EmailConfiguration:From").Value,
                    To = user.Email.ToString(),
                    Subject = "Your Account is Locked",
                    Body = new StringBuilder().Append("Your Account is Locked Due to Wrong Attempts"),
                    IsBodyHtml = true
                });
                Alerts.Warning(L["The user account has been locked out due to invalid login attempts. Please try after 5 minutes or contact to support"]);
                return Page();
            }

            if (result.IsNotAllowed)
            {
                Alerts.Warning(L["LoginIsNotAllowed"]);
                return Page();
            }

            if (!result.Succeeded)
            {
                IsCredentialsWrong = true;
                Alerts.Danger(L["InvalidUserNameOrPassword"]);
                return Page();
            }

            //TODO: Find a way of getting user's id from the logged in user and do not query it again like that!

            Debug.Assert(user != null, nameof(user) + " != null");

            return RedirectSafely(ReturnUrl, ReturnUrlHash);
        }

        [UnitOfWork]
        public virtual async Task<IActionResult> OnPostExternalLogin(string provider)
        {
            var redirectUrl = Url.Page("./Login", pageHandler: "ExternalLoginCallback", values: new { ReturnUrl, ReturnUrlHash });
            var properties = SignInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            properties.Items["scheme"] = provider;

            return Challenge(properties, provider);
        }

        [UnitOfWork]
        public virtual async Task<IActionResult> OnGetExternalLoginCallbackAsync(string returnUrl = "", string returnUrlHash = "", string remoteError = null)
        {
            //TODO: Did not implemented Identity Server 4 sample for this method (see ExternalLoginCallback in Quickstart of IDS4 sample)
            /* Also did not implement these:
             * - Logout(string logoutId)
             */

            if (remoteError != null)
            {
                Logger.LogWarning($"External login callback error: {remoteError}");
                return RedirectToPage("./Login");
            }

            var loginInfo = await SignInManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                Logger.LogWarning("External login info is not available");
                return RedirectToPage("./Login");
            }

            var result = await SignInManager.ExternalLoginSignInAsync(
                loginInfo.LoginProvider,
                loginInfo.ProviderKey,
                isPersistent: false,
                bypassTwoFactor: true
            );

            if (result.IsLockedOut)
            {
                throw new UserFriendlyException("Cannot proceed because user is locked out!");
            }

            if (result.Succeeded)
            {
                return RedirectSafely(returnUrl, returnUrlHash);
            }

            //TODO: Handle other cases for result!

            // Get the information about the user from the external login provider
            var info = await SignInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                throw new ApplicationException("Error loading external login information during confirmation.");
            }

            var user = await CreateExternalUserAsync(info);

            await SignInManager.SignInAsync(user, false);
            return RedirectSafely(returnUrl, returnUrlHash);
        }

        protected virtual async Task<IdentityUser> CreateExternalUserAsync(ExternalLoginInfo info)
        {
            var emailAddress = info.Principal.FindFirstValue(AbpClaimTypes.Email);

            var user = new IdentityUser(GuidGenerator.Create(), emailAddress, emailAddress, CurrentTenant.Id);

            CheckIdentityErrors(await UserManager.CreateAsync(user));
            CheckIdentityErrors(await UserManager.SetEmailAsync(user, emailAddress));
            CheckIdentityErrors(await UserManager.AddLoginAsync(user, info));

            return user;
        }

        protected virtual async Task ReplaceEmailToUsernameOfInputIfNeeds()
        {
            if (!ValidationHelper.IsValidEmailAddress(LoginInput.UserNameOrEmailAddress))
            {
                return;
            }

            var userByUsername = await UserManager.FindByNameAsync(LoginInput.UserNameOrEmailAddress);
            if (userByUsername != null)
            {
                return;
            }

            var userByEmail = await UserManager.FindByEmailAsync(LoginInput.UserNameOrEmailAddress);
            if (userByEmail == null)
            {
                return;
            }

            LoginInput.UserNameOrEmailAddress = userByEmail.UserName;
        }

        protected virtual async Task CheckLocalLoginAsync()
        {
            if (!await SettingProvider.IsTrueAsync(AccountSettingNames.EnableLocalLogin).ConfigureAwait(false))
            {
                throw new UserFriendlyException(L["LocalLoginDisabledMessage"]);
            }
        }
        private static string GetDomainUrl(string returnUrl) => HttpUtility.UrlDecode(returnUrl.Split("&").FirstOrDefault(x => x.Contains("redirect_uri")).Split("=")[1]) + "/auth/forget-password";


        public class LoginInputModel
        {
            [Required]
            //[StringLength(IdentityUserConsts.MaxEmailLength)]
            public string UserNameOrEmailAddress { get; set; }

            [Required]
            //[StringLength(IdentityUserConsts.MaxPasswordLength)]
            [DataType(DataType.Password)]
            [DisableAuditing]
            public string Password { get; set; }

            public bool RememberMe { get; set; }
        }

        public class ExternalProviderModel
        {
            public string DisplayName { get; set; }
            public string AuthenticationScheme { get; set; }
        }
    }
}

