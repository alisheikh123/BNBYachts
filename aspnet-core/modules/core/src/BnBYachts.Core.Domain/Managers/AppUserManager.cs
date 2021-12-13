

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.AspNetCore.WebUtilities;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.Uow;

namespace BnBYachts.Core.Managers
{
    [UnitOfWork]
    public class AppUserManager : DomainService, IAppUserManager
    {
        private readonly IRepository<IdentityUser, Guid> _repository;

        private readonly IdentityUserManager _userManager;
        private readonly IdentityRoleManager _roleManager;
        private readonly EventBusDispatcher _eventBusDispatcher;

        //private readonly IObjectMapper<CoreDomainModule> _objectMapper;

        public AppUserManager(IRepository<IdentityUser, Guid> repository,
            IdentityUserManager userManager, IdentityRoleManager roleManager,
            EventBusDispatcher eventBusDispatcher)
        {
            _repository = repository;
            _userManager = userManager;
            _roleManager = roleManager;
            _eventBusDispatcher = eventBusDispatcher;
        }
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId)
        {
            var user = await _repository.GetAsync(res => res.Id == userId.Value).ConfigureAwait(false);
            return UserFactory.Contruct(user.Id.ToString(), user.Name, (user.GetProperty<string>(UserConstants.ImagePath) ?? ""), user.Roles, user.CreationTime, (user.GetProperty<string>(UserConstants.About) ?? ""), user.PhoneNumber, user.PhoneNumberConfirmed, user.Email);
        }

        public async Task<ResponseDto> RegisterUser(UserRegisterTransferable userInput)
        {
           
                var _respone = new ResponseDto();
                var user = new IdentityUser(userInput.Id, userInput.UserName, userInput.Email)
                {
                    Name = userInput.FirstName + " " + userInput.LastName
                };
                user.SetProperty(UserConstants.DOB, userInput.DOB);
                var result = await _userManager.CreateAsync(user, userInput.Password);
                if (result.Succeeded)
                {
                    var isRoleAssigned = await _userManager.AddToRolesAsync(user, userInput.RoleId);
                    if (!isRoleAssigned.Succeeded)
                    {
                        return _respone;
                    }

                    if(false)
                     await SendEmailToAskForEmailConfirmationAsync(user);
                    _respone.Message = "Account created successfully";
                }
                else
                {
                    _respone.Message = result.Errors.ToList().FirstOrDefault()?.Description;
                    _respone.Status = false;
                }
                return _respone;
        }

        public async Task SendEmailToAskForEmailConfirmationAsync(IdentityUser user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            user.SetProperty(UserConstants.EmailConfirmationToken, token);
            await _repository.UpdateAsync(user);

            string baseUrl = Environment.GetEnvironmentVariable("BNB_APP_SELF_URL", EnvironmentVariableTarget.Machine) + "activate-account";
            var queryParams = new Dictionary<string, string>()
            {
            {"username", user.UserName },
            {"id", token },
            };
            string body = $"<h4>Click on the link below to confirm your account </h4><span> <a href = '{QueryHelpers.AddQueryString(baseUrl, queryParams)}'> Click Me </a></span>";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = user.Email,
                Subject = "Email Confirmation",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
        }

        public async Task<bool> ConfirmEmail(string username, string token)
        {
            var users = await _repository.FirstOrDefaultAsync(x => x.Email == username).ConfigureAwait(false);
            var finalToken = token.Replace(" ", "+");
            return users != null && users.GetProperty<string>(UserConstants.EmailConfirmationToken) == finalToken &&
                   (await _userManager.ConfirmEmailAsync(users, finalToken).ConfigureAwait(false)).Succeeded;
        }

        public async Task ResendEmail(string username)
        {
            var user = await _repository.FirstOrDefaultAsync(x => x.Email == username);
            await SendEmailToAskForEmailConfirmationAsync(user);
        }

        public async Task<bool> UpdateUserProfile(UserProfileRequestable userInput)
        {
            var user = await _repository.GetAsync(x => x.Id.ToString() == userInput.Id).ConfigureAwait(false);
            if (user != null)
            {
                user.Name = userInput.Name;
                user.SetProperty(UserConstants.About, userInput.About);
                var changePhoneNumberToken = await _userManager.GenerateChangePhoneNumberTokenAsync(user, userInput.PhoneNumber);
                var changePhoneResult = await _userManager.ChangePhoneNumberAsync(user, userInput.PhoneNumber, changePhoneNumberToken);
                var res = await _repository.UpdateAsync(user);
                return true;
            }
            return false;
        }
        public async Task<bool> AddHostRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId).ConfigureAwait(false);
            await _userManager.AddToRoleAsync(user, "Host");
            return true;
        }

        public  async Task<ResponseDto> AddRoles(RolesTransferable userInput)
        {
            var _respone = new ResponseDto();
            var user = new IdentityRole(Guid.NewGuid(), userInput.NormalizedName)
            {
                IsDefault = userInput.IsDefault,
                IsPublic = userInput.IsPublic,
                IsStatic = userInput.IsStatic
            };
            var isRoleCreated= await _roleManager.CreateAsync(user);
            if (isRoleCreated.Succeeded)
            {
                    return _respone;
            }
            else
            {
                _respone.Message = isRoleCreated.Errors.ToList().FirstOrDefault()?.Description;
                _respone.Status = false;
            }
            return _respone;

        }
    }
}
