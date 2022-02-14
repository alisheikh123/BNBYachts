using BnBYachts.Core.Admin.Interface;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Core.Managers
{
    public class AdminManager : DomainService, IAdminManager
    {
        private readonly IdentityUserManager _userManager;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;

        public AdminManager(IdentityUserManager userManager, IObjectMapper<CoreDomainModule> objectMapper)
        {
            _userManager = userManager;
            _objectMapper = objectMapper;
        }
        public async Task<List<BoatUserTransferable>> GetBoatOwersAndUsers(string roleName)
        {
            var data = await _userManager.GetUsersInRoleAsync(roleName).ConfigureAwait(false);
            return _objectMapper.Map<List<IdentityUser>, List<BoatUserTransferable>>(data.ToList());
            //var response = new EntityResponseListModel<BoatUserTransferable>();
            //var data = await _userManager.GetUsersInRoleAsync(roleName).ConfigureAwait(false);
            //var users = _objectMapper.Map<List<IdentityUser>, PagedList<BoatUserTransferable>>(data.ToList());
            //response.TotalCount = users.Count();
            //response.Data = await PagedList<BoatUserTransferable>.CreateAsync(users, pagination.CurrentPage, pagination.ItemsPerPage);
            //if (!string.IsNullOrWhiteSpace(SearchText))
            //    response.Data = response.Data.Where(c => c.Name.Contains(SearchText) || c.Email.Contains(SearchText) || c.PhoneNumber.Contains(SearchText)).ToList();
            //return response;
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
    }
}
