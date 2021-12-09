using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace BnBYachts.Core.Managers
{
   
    public class AppUserManager : DomainService, IAppUserManager
    {
        private readonly IRepository<IdentityUser, Guid> _repository;
        private readonly ResponseDto _respone = new ResponseDto();
        private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IRepository<IdentityUser, Guid> _userRepository;
        private readonly IRepository<IdentityRole, Guid> _roleRepository;

        private readonly IObjectMapper<CoreDomainModule> _objectMapper;

        public AppUserManager(IRepository<IdentityUser, Guid> repository,
            Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager,
            IRepository<IdentityUser, Guid> userRepository, IRepository<IdentityRole, Guid> roleRepository,
            EventBusDispatcher eventBusDispatcher)
        {
            _repository = repository;
            _userManager = userManager;
            _eventBusDispatcher = eventBusDispatcher;
            _userRepository = userRepository;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId)
        {
            var user = await _repository.GetAsync(res => res.Id == userId.Value).ConfigureAwait(false);
            return UserFactory.Contruct(user.Id.ToString(), user.Name, (user.GetProperty<string>(UserConstants.ImagePath) ?? ""), user.Roles, user.CreationTime);
        }

        public async Task<ResponseDto> RegisterUser(UserRegisterTransferable userInput)
        {
            IdentityUser user = new IdentityUser(Guid.NewGuid(), userInput.Email, userInput.Email); // Username is same as email address
            user.Name = userInput.FirstName + " " + userInput.LastName;
            user.SetProperty(UserConstants.DOB, userInput.DOB);
            var result = await _userManager.CreateAsync(user, userInput.Password);
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
            string body = $"<h4>Click on the link below to confirm your account </h4><span> <a href = '{QueryHelpers.AddQueryString(baseUrl, queryParams)}'> Click Me </a></span>";
            _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
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

        [UnitOfWork]
        public virtual async Task<UserRequestable> InsertUsers(UserRequestable input)
        {
            IdentityUser userName = new IdentityUser(Guid.NewGuid(), input.Email, input.UserName);
            userName.Name = input.Name;
            userName.SetProperty(UserConstants.DOB, input.DOB);
            await _userManager.CreateAsync(userName, input.PasswordHash);
            //await _userManager.AddToRoleAsync(userName, input.RoleName);
            return new UserRequestable();
        }
        public async Task<RolesRequestable> InsertRoles(RolesRequestable input)
        {
            await _roleRepository.InsertAsync(_objectMapper.Map<RolesRequestable, IdentityRole>(input), true);
            return new RolesRequestable();
        }

        public Task<UserRolesRequestable> InsertUserRoles(UserRolesRequestable input)
        {
            throw new NotImplementedException();
        }
    }
}
