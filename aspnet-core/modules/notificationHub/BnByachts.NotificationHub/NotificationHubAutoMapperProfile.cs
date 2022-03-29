using AutoMapper;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Notification.Notification.Transferables;

namespace BnByachts.NotificationHub
{
    internal class NotificationHubAutoMapperProfile : Profile
    {
        public NotificationHubAutoMapperProfile()
        {
           CreateMap<INotificationContract, NotificationTransferable>();
        }
    }
}