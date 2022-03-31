using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BnBYachts.Notification.Entitiy;
using BnBYachts.Notification.IManager;
using BnBYachts.Notification.Notification.Requestable;
using BnBYachts.Notification.Notification.Transferables;
using BnBYachts.Shared.Model;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Notification.Manager
{
    public class NotificationManager : DomainService, INotificationManager
    {

        private readonly IRepository<NotificationEntity, Guid> _notificationRepository;
        private readonly IObjectMapper<NotificationDomainModule> _objectMapper;

        public NotificationManager(IRepository<NotificationEntity, Guid>
            notificationRepository,
            IObjectMapper<NotificationDomainModule> objectMapper) //inject default repository
        {
            _notificationRepository = notificationRepository;
            _objectMapper = objectMapper;
        }

        public async Task<EntityResponseModel> Insert(NotificationTransferable input)
        {
            //use auto map

                NotificationEntity n = new NotificationEntity();
                n.NotificationType = input.NotificationType;
                n.UserTo = input.UserTo;
                n.UserFrom = input.UserFrom;
                n.ChatId = input.ChatId;
                n.RequestQuoteId = input.RequestQuoteId;
                n.PaymentId = input.PaymentId;
                n.EventId = input.EventId;
                n.RoleName = input.RoleName;
                n.BookingId = input.BookingId;
                n.DisputeId = input.DisputeId;
                n.ContractId = input.ContractId;
                n.CharterId = input.CharterId;
                n.Description = input.Description;
                n.IsSeen = input.IsSeen;
                n.BoatId = input.BoatId;
                n.Title = input.Title;
                await _notificationRepository.InsertAsync(n).ConfigureAwait(false);
            return _successResponse(input);
        }

        private static EntityResponseModel _successResponse(object data = null) => new EntityResponseModel
        {
            ReturnStatus = true,
            Data = data,
            ReturnMessage = new List<string> { new string("200") }
        };

        public async Task<EntityResponseListModel<NotificationDto>> Get(EntityPaginationFilter input) => new EntityResponseListModel<NotificationDto> {
            Data = _objectMapper.Map<List<NotificationEntity>, List<NotificationDto>>(await _notificationRepository.GetListAsync().ConfigureAwait(false))
            };
    }
}
