using BnBYachts.Core.Shared.Transferable;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Interface
{
    public interface IAppUserManager
    {
        Task<UserDetailsTransferable> GetUserDetails(Guid? userId);
    }
}
