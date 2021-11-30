using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Transferable;
using Microsoft.AspNetCore.Authorization;
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
        [Route("GetLoggedInUserDetails")]
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails()
        {
            return await _appUserManager.GetLoggedInUserDetails(CurrentUser.Id);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetUserDetailsById/{userId}")]
        public async Task<UserDetailsTransferable> GetUserDetailsById(Guid? userId)
        {
            return await _appUserManager.GetLoggedInUserDetails(userId);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<ResponseDto> UserRegister(RegisterDto registerDTO)
        {
                return await _appUserManager.RegisterUser(registerDTO.FirstName, registerDTO.LastName, registerDTO.Email, registerDTO.Email, registerDTO.Password, "", registerDTO.DOB);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("Confirm-Email")]
        public async Task<bool> ConfirmEmail(string username, string token)
        {
                bool isConfirmed = await _appUserManager.ConfirmEmail(username, token);
                return isConfirmed;
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("Resend-Email")]
        public async Task<bool> ResendEmail(string username)
        {
                await _appUserManager.ResendEmail(username);
                return true;
        }
    }


}
