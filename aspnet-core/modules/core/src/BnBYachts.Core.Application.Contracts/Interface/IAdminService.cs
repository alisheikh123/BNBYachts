﻿using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Interface
{
    public interface IAdminService : IApplicationService
    {
        Task<EntityResponseListModel<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName, string SearchText, PaginationHeader pagination);
        Task<TotalUsersTransferable> GetTotalUsers(string userRole, string hostRole);

    }
}
