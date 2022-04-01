
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

        public async Task<Tuple<string, string>> GetUserConnections(string userId)
        {
            var response = (await _notifcationRepository.GetListAsync
                (x => x.UserId.
                    Equals(userId.ToLower())).ConfigureAwait(false)).OrderBy(x => x.CreationTime).LastOrDefault();
            return new Tuple<string, string>(response?.ConnectionId, response?.UserId);
        }

        public async Task KeepUserConnection(string userId, string connectionId)
        {
            await RemoveUserConnection(userId).ConfigureAwait(false);
            await _notifcationRepository.InsertAsync(new NotificationConnectionEntity
            {
                UserId = userId.ToLower(),
                ConnectionId = connectionId

            }).ConfigureAwait(false);
        }

        public async Task RemoveUserConnection(string userId)
        {

            await Task.CompletedTask;
            //_notifcationRepository.FirstOrDefaultAsync(x=>x.UserId.Equals())
        }
    }
}
