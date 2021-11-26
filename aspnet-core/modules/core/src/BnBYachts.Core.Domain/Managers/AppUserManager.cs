﻿using BnBYachts.Core.Shared;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Transferable;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;

namespace BnBYachts.Core.Managers
{
    public class AppUserManager : DomainService, IAppUserManager
    {
        private readonly IRepository<IdentityUser, Guid> _repository;

        public AppUserManager(IRepository<IdentityUser, Guid> repository)
        {
            _repository = repository;
        }
        public async Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId)
        {
            var user = await _repository.GetAsync(res => res.Id == userId.Value).ConfigureAwait(false);
            string profileImage = null;
            if (user.GetProperty<string>(UserConstants.ImagePath) != null)
            {
                profileImage = user.GetProperty<string>(UserConstants.ImagePath).ToString();
            }
            var data = UserFactory.Contruct(user.Id.ToString(), user.Name, profileImage, user.Roles,user.CreationTime);
            return data;
        }
    }
}