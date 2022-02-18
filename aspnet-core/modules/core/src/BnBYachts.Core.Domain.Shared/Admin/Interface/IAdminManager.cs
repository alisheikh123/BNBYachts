using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Admin.Interface
{
    public interface IAdminManager
    {
        //Task<EntityResponseListModel<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName, string SearchText, PaginationHeader pagination);
        Task<List<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName);
        Task<TotalUsersTransferable> GetTotalUsers(string userRole, string hostRole);
        Task<AdminResponseDto> SuspendUser(Guid id);
        Task<AdminResponseDto> RegisterAdmin(AdminRegisterTransferable userInput);

    }
}
