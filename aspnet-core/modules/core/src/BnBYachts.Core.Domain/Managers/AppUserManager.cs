using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.Core.Enum;
using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;
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
        private readonly IConfiguration _config;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        private readonly ILogger<IAppUserManager> _logger;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public AppUserManager(IRepository<IdentityUser, Guid> repository,
            IdentityUserManager userManager, IdentityRoleManager roleManager,
            EventBusDispatcher eventBusDispatcher, IConfiguration config,
            IObjectMapper<CoreDomainModule> objectMapper, 
            ILogger<IAppUserManager> logger,
            IUnitOfWorkManager unitOfWorkManager
            )
        {
            _repository = repository;
            _userManager = userManager;
            _roleManager = roleManager;
            _eventBusDispatcher = eventBusDispatcher;
            _config = config;
            _objectMapper = objectMapper;
            _logger = logger;
            _unitOfWorkManager = unitOfWorkManager;
        }
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId)
        {
            var user = await _repository.GetAsync(res => res.Id == userId.Value).ConfigureAwait(false);
            var userRoles = new List<RolesTransferable>();
            if (user.Roles.Any())
            {
                foreach (var item in user.Roles)
                {
                    userRoles.Add(_objectMapper.Map<IdentityRole, RolesTransferable>(await _roleManager.GetByIdAsync(item.RoleId).ConfigureAwait(false)));
                }
            }
            _logger.LogInformation("Get user detail against user Id : " + _unitOfWorkManager.Current.Id.ToString());
            return UserFactory.Contruct(user.Id.ToString(), user.Name, (user.GetProperty<string>(UserConstants.ImagePath) ?? ""), user.Roles, user.CreationTime, (user.GetProperty<string>(UserConstants.About) ?? ""), user.PhoneNumber, user.PhoneNumberConfirmed, user.Email, (user.GetProperty<bool>(UserConstants.IsInitialLogin)),(user.GetProperty<bool>(UserConstants.IsEmailConfirmed)), userRoles);
        }
        public async Task<UserDetailsTransferable> GetUserDetailsByUserName(string username)
        {
            var user = await _repository.GetAsync(res => res.UserName == username).ConfigureAwait(false);
              
            _logger.LogInformation("Get user detail against user name : " + _unitOfWorkManager.Current.Id.ToString());
            return UserFactory.Contruct(user.Id.ToString(), user.Name, (user.GetProperty<string>(UserConstants.ImagePath) ?? "") , user.Roles , user.CreationTime, (user.GetProperty<string>(UserConstants.About) ?? ""), user.PhoneNumber, user.PhoneNumberConfirmed, user.Email, (user.GetProperty<bool>(UserConstants.IsInitialLogin)), (user.GetProperty<bool>(UserConstants.IsEmailConfirmed)));
        }
        public async Task<UserDetailsTransferable> GetUserDetailsById(string id)
        {
            var user = await _repository.GetAsync(res => res.Id.ToString() == id.ToString()).ConfigureAwait(false);
            _logger.LogInformation("Get user detail against user name : " + _unitOfWorkManager.Current.Id.ToString());
            return UserFactory.Contruct(user.Id.ToString(), user.Name, (user.GetProperty<string>(UserConstants.ImagePath) ?? ""), user.Roles, user.CreationTime, (user.GetProperty<string>(UserConstants.About) ?? ""), user.PhoneNumber, user.PhoneNumberConfirmed, user.Email, (user.GetProperty<bool>(UserConstants.IsInitialLogin)), (user.GetProperty<bool>(UserConstants.IsEmailConfirmed)));

        }
        public async Task<bool> IsEmailExist(string email)
        {
            var user = await _repository.FindAsync(res => res.Email == email).ConfigureAwait(false);
            return user != null ? true : false;
        }

        public async Task<ResponseDto> RegisterUser(UserRegisterTransferable userInput)
        {
            var _respone = new ResponseDto();
            var user = new IdentityUser(userInput.Id, userInput.Email, userInput.Email)
            {
                Name = userInput.FirstName + " " + userInput.LastName
            };
            user.SetProperty(UserConstants.DOB, userInput.DOB);
            user.SetProperty(UserConstants.IsInitialLogin, true);
            user.SetProperty(UserConstants.IsActive, true);
            var result = await _userManager.CreateAsync(user, userInput.Password);
            if (result.Succeeded)
            {
                var isRoleAssigned = await _userManager.AddToRoleAsync(user, "USER");
                if (!isRoleAssigned.Succeeded)
                {
                    return _respone;
                }
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
            var rootUrl = _config.GetSection("AppUrl:ClientUrl").Value;
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            user.SetProperty(UserConstants.EmailConfirmationToken, token);
            await _repository.UpdateAsync(user);
            //string baseUrl = Environment.GetEnvironmentVariable("BNB_APP_SELF_URL", EnvironmentVariableTarget.Machine) + "activate-account";
            string baseUrl = rootUrl + "/activate-account";
            var queryParams = new Dictionary<string, string>()
            {
            {"username", user.UserName },
            {"id", token },
            };
            string body = $"<h4>Hello {user.Name} </h4> <div> You registered an account on BnByachts, before being able to use your account you need to verify your email address by clicking here: <a href='{QueryHelpers.AddQueryString(baseUrl, queryParams)}'>Click Here</a> </div><br>Best Regard";
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
        public async Task<EntityResponseModel> AddServiceProviderRole(string userId, string type)
        {
            var user = await _userManager.FindByIdAsync(userId).ConfigureAwait(false);
            if (user == null || type.IsNullOrWhiteSpace()) return  new EntityResponseModel{ ReturnStatus=false};
            await _userManager.AddToRoleAsync(user, type);
            return new EntityResponseModel();
        }

        public async Task<ResponseDto> AddRoles(RolesTransferable userInput)
        {
            var _respone = new ResponseDto();
            var user = new IdentityRole(userInput.Id, userInput.NormalizedName)
            {
                IsDefault = userInput.IsDefault,
                IsPublic = userInput.IsPublic,
                IsStatic = userInput.IsStatic
            };
            var isRoleCreated = await _roleManager.CreateAsync(user);
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
        public async Task<UserReview> IsRoleName(string userId, string userRole , string hostRole)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (await _userManager.IsInRoleAsync(user, userRole) && await _userManager.IsInRoleAsync(user, hostRole))
                return UserReview.Both;
            else if(await _userManager.IsInRoleAsync(user, userRole))
                return UserReview.User;
            else
                return UserReview.Host;
        }
    }
}