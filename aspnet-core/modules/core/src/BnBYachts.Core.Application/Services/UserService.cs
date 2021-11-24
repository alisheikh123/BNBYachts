using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Transferable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services
{
    [Authorize]
    public class UserService : ApplicationService
    {
        private readonly IAppUserManager _appUserManager;
        public UserService(IAppUserManager appUserManager)
        {
            _appUserManager = appUserManager;
        }

        [HttpGet]
        [Route("GetUserDetails")]
        public async Task<UserDetailsTransferable> GetUserDetails()
        {
            return await _appUserManager.GetUserDetails(CurrentUser.Id);
        }
    }


}
