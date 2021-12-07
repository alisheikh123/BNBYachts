using BnBYachts.Core.Shared.Dto;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Interface
{
    public interface IAppUserManager
    {
        Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId);
        Task<ResponseDto> RegisterUser(UserRegisterTransferable userInput);
        Task<bool> ConfirmEmail(string username, string token);
        Task ResendEmail(string username);
        Task<bool> UpdateUserProfile(UserProfileRequestable userInput);
        Task<bool> AddHostRole(string userId);
    }

}
