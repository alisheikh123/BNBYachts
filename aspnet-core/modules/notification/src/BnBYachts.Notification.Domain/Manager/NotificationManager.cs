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
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Notification.Manager
{
    public class NotificationManager : INotificationManager
    {

        private readonly IRepository<NotificationEntity, long> _notificationRepository;
        private readonly IObjectMapper<NotificationDomainModule> _objectMapper;

        public NotificationManager(IRepository<NotificationEntity, long>
            notificationRepository,
            IObjectMapper<NotificationDomainModule> objectMapper) //inject default repository
        {
            _notificationRepository = notificationRepository;
            _objectMapper = objectMapper;
        }

        public async Task<EntityResponseModel> Insert(NotificationTransferable input)
        {
            await _notificationRepository.InsertAsync(_objectMapper.Map<NotificationTransferable, NotificationEntity>(input)).ConfigureAwait(false);
            return _successResponse(input);
        }

        private static EntityResponseModel _successResponse(object data = null) => new EntityResponseModel
        {
            ReturnStatus = true,
            Data = data,
            ReturnMessage = new List<string> { new string("200") }
        };

        public async Task<EntityResponseListModel<NotificationDto>> Get(EntityPaginationFilter input) =>
             new EntityResponseListModel<NotificationDto>
             {
                 Data = _objectMapper.Map<List<NotificationEntity>, List<NotificationDto>>(
                    await _notificationRepository.GetListAsync())
             };
    }
}
