using AutoMapper;
using BnBYachts.Notification.Entitiy;
using BnBYachts.Notification.Notification.Requestable;
using BnBYachts.Notification.Notification.Transferables;

namespace BnBYachts.Notification
{
    public class NotificationDomainAutoMapperProfile : Profile
    {
        public NotificationDomainAutoMapperProfile()
        {
            CreateMap<NotificationTransferable, NotificationEntity>();

            CreateMap<NotificationEntity, NotificationDto>();

        }
    }
}