using BnBYachts.Services.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Volo.Abp.Account.Web.Pages.Account.LoginModel;

namespace BnBYachts.Interfaces.IdentityInterface
{
    public interface ILoginService
    {
        Task Login(string username,string password);
        Task<object> UserInfo(string UserId);

        Task<string> EmailVerification(ForgotPasswordDto forgotPasswordDto);
        //[HiddenInput]
        //[BindProperty(SupportsGet = true)]
        //public string ReturnUrl { get; set; }

        //[HiddenInput]
        //[BindProperty(SupportsGet = true)]
        //public string ReturnUrlHash { get; set; }

        ////[BindProperty]
        ////public LoginInputModel LoginInput { get; set; }

        //public bool EnableLocalLogin { get; set; }

        //public IEnumerable<ExternalProviderModel> ExternalProviders { get; set; }
        //public IEnumerable<ExternalProviderModel> VisibleExternalProviders => ExternalProviders.Where(x => !String.IsNullOrWhiteSpace(x.DisplayName));

        //public bool IsExternalLoginOnly => EnableLocalLogin == false && ExternalProviders?.Count() == 1;
        //public string ExternalLoginScheme => IsExternalLoginOnly ? ExternalProviders?.SingleOrDefault()?.AuthenticationScheme : null;
    }
}
