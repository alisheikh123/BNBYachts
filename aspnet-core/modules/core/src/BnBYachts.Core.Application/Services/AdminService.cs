using BnBYachts.Core.Admin.Interface;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Core.Interface;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.PermissionManagement;

namespace BnBYachts.Core.Services
{
    [Authorize]
    public class AdminService : ApplicationService , IAdminService
    {
        private readonly IAdminManager _adminManager;
        private readonly IPermissionManager _permissionManager;
        public AdminService(IAdminManager adminManager)
        {
            _adminManager = adminManager;
        }

        public async Task<List<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName) =>  await _adminManager.GetBoatOwersAndUsers(roleName);
        public async Task<TotalUsersTransferable> GetTotalUsers(string userRole, string hostRole) => await _adminManager.GetTotalUsers(userRole,hostRole);
        public async Task<AdminResponseDto> AdminRegister(AdminRegisterTransferable userInput) =>
            await _adminManager.RegisterAdmin(userInput);
        public async Task<AdminResponseDto> SuspendUser(Guid id) => await _adminManager.SuspendUser(id);

        public async Task<AdminResponseDto> SetAdminPassword(SetPasswordRequestable userInput) =>
            await _adminManager.SetAdminPassword(userInput);

        public async Task<EntityResponseModel> GetRolesList()
        {
            //_permissionManager.Se
            return await _adminManager.GetRolesList().ConfigureAwait(false); 
        }
    }
}
