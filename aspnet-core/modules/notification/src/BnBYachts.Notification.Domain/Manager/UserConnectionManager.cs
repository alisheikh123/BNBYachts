
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BnBYachts.Notification.Entitiy;
using BnBYachts.Notification.Notification.IManager;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Notification.Manager
{
    public class UserConnectionManager : IUserConnectionManager
    {
        private readonly IRepository<NotificationConnectionEntity, Guid> _notifcationRepository;


        public UserConnectionManager(IRepository<NotificationConnectionEntity, Guid> notifcationRepository)
        {
            _notifcationRepository = notifcationRepository;
        }

        public async Task<List<string>> GetUserConnections(string userId)
        {
            return (await _notifcationRepository.GetListAsync
                (x => x.UserId.Equals(userId.ToLower())).ConfigureAwait(false)).Select(x => x.ConnectionId).ToList();
        }

        public async Task KeepUserConnection(string userId, string connectionId)
        {
            //  await RemoveUserConnection(userId).ConfigureAwait(false);
            await _notifcationRepository.InsertAsync(new NotificationConnectionEntity
            {
                UserId = userId.ToLower(),
                ConnectionId = connectionId

            }).ConfigureAwait(false);
        }

        public async Task RemoveUserConnection(string connectionId)
        {
            await _notifcationRepository.DeleteManyAsync(await _notifcationRepository.GetListAsync(x => x.ConnectionId.Equals(connectionId)).
                ConfigureAwait(false)).ConfigureAwait(false);
        }
    }
}
