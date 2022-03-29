using System.Threading.Tasks;
using BnBYachts.Notification.IManager;
using BnBYachts.Notification.Notification.Requestable;
using BnBYachts.Notification.Notification.Transferables;
using BnBYachts.Shared.Model;
using Volo.Abp.Application.Services;

namespace BnBYachts.Notification
{
    public class InAppNotificationAppService : ApplicationService
    {
        private readonly INotificationManager _notificationManager;
        public InAppNotificationAppService(INotificationManager notificationManager)
        {
            _notificationManager = notificationManager;
        }

        public async Task<EntityResponseModel> Insert(NotificationTransferable input) =>
             await _notificationManager.Insert(input).ConfigureAwait(false);

        public async Task<EntityResponseListModel<NotificationDto>> Get() =>
            await _notificationManager.Get(null).ConfigureAwait(false);
    }
}
