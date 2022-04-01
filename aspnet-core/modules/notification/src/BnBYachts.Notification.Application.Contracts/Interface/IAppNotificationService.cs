using BnBYachts.Notification.Notification.Requestable;
using BnBYachts.Notification.Notification.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Notification.Interface
{
    public interface IAppNotificationService: IApplicationService
    {
        Task<EntityResponseModel> Insert(NotificationTransferable input);
        Task<EntityResponseListModel<NotificationDto>> Get(string userId);
    }
}
