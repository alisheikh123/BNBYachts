using BnBYachts.Core.Admin.Interface;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Core.Interface;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services
{
    [Authorize]
    public class AdminService : ApplicationService , IAdminService
    {
        private readonly IAdminManager _adminManager;
        public AdminService(IAdminManager adminManager)
        {
            _adminManager = adminManager;
        }

        public async Task<EntityResponseListModel<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName, string SearchText, PaginationHeader pagination) =>  await _adminManager.GetBoatOwersAndUsers(roleName, SearchText, pagination);
        public async Task<TotalUsersTransferable> GetTotalUsers(string userRole, string hostRole) => await _adminManager.GetTotalUsers(userRole,hostRole);
    }
}
