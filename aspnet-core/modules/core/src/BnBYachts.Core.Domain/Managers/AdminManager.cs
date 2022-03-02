using BnBYachts.Core.Admin.Interface;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Transferable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
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

namespace BnBYachts.Core.Managers
{
    public class AdminManager : DomainService, IAdminManager
    {
        private readonly IdentityUserManager _userManager;
        private readonly IRepository<IdentityUser, Guid> _repository;
        private readonly IConfiguration _config;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        private readonly EventBusDispatcher _eventBusDispatcher;


        public AdminManager(IdentityUserManager userManager, IObjectMapper<CoreDomainModule> objectMapper,
            IRepository<IdentityUser, Guid> repository, IConfiguration config, EventBusDispatcher eventBusDispatcher)
        {
            _userManager = userManager;
            _objectMapper = objectMapper;
            _repository = repository;
            _config = config;
            _eventBusDispatcher = eventBusDispatcher;
        }
        public async Task<List<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName)
        {
            var data = await _userManager.GetUsersInRoleAsync(roleName).ConfigureAwait(false);
            var boatUsers = _objectMapper.Map<IList<IdentityUser>, IList<BoatUserTransferable>>(data);
            boatUsers.ToList().ForEach(res=>res.IsActive = data.FirstOrDefault(x=>x.Id.ToString()==res.Id)
            .GetProperty<bool>(UserConstants.IsActive));
            return boatUsers.ToList();
        }
        public async Task<TotalUsersTransferable> GetTotalUsers(string userRole, string hostRole)
        {
            var response = new TotalUsersTransferable();
            var user= await _userManager.GetUsersInRoleAsync(userRole).ConfigureAwait(false);
            var host= await _userManager.GetUsersInRoleAsync(hostRole).ConfigureAwait(false);
            response.Users = user.Count();
            response.Hosts = host.Count();
            return response;
        }
        public async Task<AdminResponseDto> SuspendUser(Guid id)
        {
            var response = new AdminResponseDto();
            var data = await _repository.GetAsync(x=>x.Id == id);
            if (data.GetProperty<bool>(UserConstants.IsActive) == true)
            {
                data.SetProperty(UserConstants.IsActive, false);
                response.Message = "Account Suspended Successfully";
            }
            else
            {
                data.SetProperty(UserConstants.IsActive, true);
                response.Message = "Account Active Successfully";
            }
            await _repository.UpdateAsync(data);
            return response;
        }
        public async Task<AdminResponseDto> RegisterAdmin(AdminRegisterTransferable userInput)
        {
            var _respone = new AdminResponseDto();
            var user = new IdentityUser(userInput.Id, userInput.Email, userInput.Email)
            {
                Name = userInput.FirstName + " " + userInput.LastName
            };
            user.SetProperty(UserConstants.DOB, userInput.DOB);
            user.SetProperty(UserConstants.IsInitialLogin, true);
            user.SetProperty(UserConstants.IsActive, true);
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                var isRoleAssigned = await _userManager.AddToRoleAsync(user, "ADMIN");
                if (!isRoleAssigned.Succeeded)
                    return _respone;
                await SendEmailForAdminConfirmationAsync(user);
                _respone.Message = "Account created successfully";
            }
            else
            {
                _respone.Message = result.Errors.ToList().FirstOrDefault()?.Description;
                _respone.Status = false;
            }
            return _respone;
        }
        public async Task SendEmailForAdminConfirmationAsync(IdentityUser user)
        {
            var rootUrl = _config.GetSection("App:AdminUrl").Value;
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            user.SetProperty(UserConstants.EmailConfirmationToken, token);
            await _repository.UpdateAsync(user);
            string baseUrl = rootUrl + "/setpassword";
            var queryParams = new Dictionary<string, string>()
            {
            {"username", user.UserName },
            {"id", token },
            };
            string body = $"<h4>Hello {user.Name} </h4> <div> Your Account registered on BnByachts, You can create your password by clicking here: <a href='{baseUrl}'>Click Here</a> <p> {QueryHelpers.AddQueryString(baseUrl,queryParams)} </p> </div><br>Best Regard";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = user.Email,
                Subject = "Admin Confirmation",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
        }
        public async Task<AdminResponseDto> SetAdminPassword(SetPasswordRequestable userInput)
        {
            var response = new AdminResponseDto();
            var user = await _userManager.FindByEmailAsync(userInput.Email).ConfigureAwait(false);
            if (user != null)
            {
                var result1 = await _userManager.ConfirmEmailAsync(user, userInput.Id).ConfigureAwait(false);
                if (result1.Succeeded)
                {
                    var result = await _userManager.AddPasswordAsync(user, userInput.Password);
                    if (result.Succeeded)
                        response.Message = "Password created Successfully";
                    else
                    {
                        response.Message = result.Errors.ToList().FirstOrDefault()?.Description;
                        response.Status = false;
                    }
                }
                else
                {
                    response.Message = result1.Errors.ToList().FirstOrDefault()?.Description;
                    response.Status = false;
                }
            }
            else
            {
                response.Message = "User Not Found";
                response.Status = false;
            }
            return response;
        }
    }
}
