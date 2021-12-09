using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Core.Shared.Interface
{
    public interface IAppUserManager:IDomainService
    {
        Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId);
        Task<ResponseDto> RegisterUser(UserRegisterTransferable userInput);
        Task<bool> ConfirmEmail(string username, string token);
        Task ResendEmail(string username);
        Task<UserRequestable> InsertUsers(UserRequestable input);
        Task<RolesRequestable> InsertRoles(RolesRequestable input);
        Task<UserRolesRequestable> InsertUserRoles(UserRolesRequestable input);
    }
}
