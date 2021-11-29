using BnByachts.NotificationHub.Consumers;
using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Transferable;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;

namespace BnBYachts.Core.Managers
{
    public class AppUserManager : DomainService, IAppUserManager
    {
        private readonly IRepository<IdentityUser, Guid> _repository;
        private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager;

        public AppUserManager(IRepository<IdentityUser, Guid> repository, Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId)
        {
            var user = await _repository.GetAsync(res => res.Id == userId.Value).ConfigureAwait(false);
            string profileImage = null;
            if (user.GetProperty<string>(UserConstants.ImagePath) != null)
            {
                profileImage = user.GetProperty<string>(UserConstants.ImagePath).ToString();
            }
            var data = UserFactory.Contruct(user.Id.ToString(), user.Name, profileImage, user.Roles, user.CreationTime);
            return data;
        }

        public async Task<UserDetailsTransferable> RegisterUser(string firstName, string lastName, string emailAddress, string userName, string plainPassword, string emailActivationLink, DateTime dob)
        {
            try
            {
                IdentityUser user = new IdentityUser(Guid.NewGuid(), emailAddress, emailAddress);
                user.Name = firstName + " " + lastName;
                user.SetProperty(UserConstants.DOB, dob);
                var result = await _userManager.CreateAsync(user, plainPassword);
                if (result.Succeeded)
                {
                    var token = await SendEmailToAskForEmailConfirmationAsync(user);
                }
                var data = UserFactory.Contruct(user.Id.ToString(), user.Name, "", user.Roles, user.CreationTime);
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private async Task<Uri> SendEmailToAskForEmailConfirmationAsync(Volo.Abp.Identity.IdentityUser user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            user.SetProperty(UserConstants.EmailConfirmationToken, token);
            await _repository.UpdateAsync(user);

            const string url = "http://44.197.69.129:8080/activate-account";
            var uriBuilder = new UriBuilder(url);
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["username"] = user.UserName;
            query["id"] = token;
            uriBuilder.Query = query.ToString();
           var link = uriBuilder.Uri;
            Console.WriteLine(link.AbsoluteUri);
            Console.WriteLine(link.ToString());
          
            return link;
        }

        public async Task<bool> ConfirmEmail(string username,string token)
        {
            //var users = await _repository.GetAsync(x => x.Email == username);
            var users = await _repository.FirstOrDefaultAsync(x => x.Email == username);
            if (users != null)
            {
                if (users.GetProperty<String>(UserConstants.EmailConfirmationToken) == token)
                {
                    var result = await _userManager.ConfirmEmailAsync(users, token);
                    if (result.Succeeded)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }

    }
}
