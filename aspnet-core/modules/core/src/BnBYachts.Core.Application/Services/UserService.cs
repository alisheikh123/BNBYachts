using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services
{
    [Authorize]
    public class UserService : ApplicationService
    {
        private readonly IAppUserManager _appUserManager;
        public UserService(IAppUserManager appUserManager)
        {
            _appUserManager = appUserManager;
        }

        [HttpGet]
        [Route("api/GetLoggedInUserDetails")]
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails()
        {
            return await _appUserManager.GetLoggedInUserDetails(CurrentUser.Id);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetUserDetailsByUserName")]
        public async Task<UserDetailsTransferable> GetUserDetailsByUserName(string username)
        {
            return await _appUserManager.GetUserDetailsByUserName(username);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetUserDetailsById/{userId}")]
        public async Task<UserDetailsTransferable> GetUserDetailsById(Guid? userId) => await _appUserManager.GetLoggedInUserDetails(userId);

        [HttpGet]
        [Route("api/AddHostRole")]
        public async Task<bool> AddHostRole()
        {
            return await _appUserManager.AddHostRole(CurrentUser.Id.ToString());
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/Register")]
        public async Task<ResponseDto> UserRegister(UserRegisterTransferable userInput)
        {
            return await _appUserManager.RegisterUser(userInput);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/Confirm-Email")]
        public async Task<bool> ConfirmEmail(string username, string token)
        {
            bool isConfirmed = await _appUserManager.ConfirmEmail(username, token);
            return isConfirmed;
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/Resend-Email")]
        public async Task<bool> ResendEmail(string username)
        {
            await _appUserManager.ResendEmail(username);
            return true;
        }

        [AllowAnonymous]
        [Route("api/Update-User-Profile")]
        public async Task<bool> UpdateUserProfile(UserProfileRequestable userInput)
        {
            userInput.Id = CurrentUser.Id.ToString();
            var result = await _appUserManager.UpdateUserProfile(userInput);
            return result;
        }
        [AllowAnonymous]
        public async Task<bool> IsEmailExists(string email) => await _appUserManager.IsEmailExist(email).ConfigureAwait(false);
     


    }


}
