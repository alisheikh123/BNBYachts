using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Notification.Notification.IManager
{
    public interface IUserConnectionManager : ITransientDependency
    {
        Task KeepUserConnection(string userId, string connectionId);
        Task RemoveUserConnection(string connectionId);
        Task<Tuple<string,string>> GetUserConnections(string userId);
    }
}
