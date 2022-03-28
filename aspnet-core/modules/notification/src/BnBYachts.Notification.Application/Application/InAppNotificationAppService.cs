using System.Threading.Tasks;
using BnBYachts.Notification.IManager;
using BnBYachts.Notification.Notification.Transferables;
using BnBYachts.Shared.Model;
using Volo.Abp.Application.Services;

namespace BnBYachts.Notification
{
    public class InAppNotificationAppService:ApplicationService
    {
        private readonly INotificationManager _notificationManager;
        public InAppNotificationAppService(INotificationManager notificationManager)
        {
            _notificationManager = notificationManager;
        }

        public async Task<EntityResponseModel> Insert(NotificationTransferable input)
        {
            return await _notificationManager.Insert(input).ConfigureAwait(false);
        }
    }
}
