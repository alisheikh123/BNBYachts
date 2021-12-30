using System.Collections.Generic;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Chat.Domain.Shared.Interfaces
{
    public interface IUserConnectionManager : ITransientDependency
    {
        void KeepUserConnection(string userId, string connectionId);
        void RemoveUserConnection(string connectionId);
        List<string> GetUserConnections(string userId);
    }
}