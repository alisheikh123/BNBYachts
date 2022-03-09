using BnBYachts.Core.Enum;
using BnBYachts.Core.Interface;
using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using BnBYachts.Shared.Model;
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
        private readonly IS3FileService _s3Service;
        public UserService(IAppUserManager appUserManager, IS3FileService s3Service)
        {
            _appUserManager = appUserManager;
            _s3Service = s3Service;
        }

        [HttpGet]
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails()
        {
            return await _appUserManager.GetLoggedInUserDetails(CurrentUser.Id);
        }

        [HttpGet]
        public async Task<UserDetailsTransferable> GetUserDetailsByUserName(string username)
        {
            return await _appUserManager.GetUserDetailsByUserName(username);
        }

        [HttpGet]
        public async Task<UserDetailsTransferable> GetUserDetailsById(Guid? userId) => await _appUserManager.GetLoggedInUserDetails(userId);

        [HttpGet]
        public async Task<bool> AddHostRole()
        {
            return await _appUserManager.AddHostRole(CurrentUser.Id.ToString());
        }
        public async Task<EntityResponseModel> AddServiceProviderRole(string type)
        {
            return await _appUserManager.AddServiceProviderRole(CurrentUser.Id.ToString(), type);
        }
        [HttpPost]
        public async Task<ResponseDto> UserRegister(UserRegisterTransferable userInput)
        {
            return await _appUserManager.RegisterUser(userInput);
        }
        [HttpGet]
        public async Task<bool> ConfirmEmail(string username, string token)
        {
            bool isConfirmed = await _appUserManager.ConfirmEmail(username, token);
            return isConfirmed;
        }
        [HttpGet]
        public async Task<bool> ResendEmail(string username)
        {
            await _appUserManager.ResendEmail(username);
            return true;
        }

        public async Task<bool> UpdateUserProfile(UserProfileRequestable userInput)
        {
            userInput.Id = CurrentUser.Id.ToString();
            var result = await _appUserManager.UpdateUserProfile(userInput);
            return result;
        }
        public async Task<bool> IsEmailExists(string email) => await _appUserManager.IsEmailExist(email).ConfigureAwait(false);

        [HttpGet]
        public async Task<UserReview> IsRoleName(string userId, string userRole, string hostRole) => await _appUserManager.IsRoleName(userId, userRole, hostRole);
        [HttpPut]
        public async Task UpdateAdminProfile(AdminProfileRequestable userInput) => await _appUserManager.UpdateAdminProfile(userInput);
    }
}
