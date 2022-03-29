using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using BnBYachts.Notification.Notification.Requestable;
using BnBYachts.Notification.Notification.Transferables;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Notification.IManager
{
    public interface INotificationManager : IDomainService
    {
        Task<EntityResponseModel> Insert(NotificationTransferable input);
        Task<EntityResponseListModel<NotificationDto>> Get(EntityPaginationFilter input);
    }
}
