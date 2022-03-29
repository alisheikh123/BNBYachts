using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using System.Threading.Tasks;
using BnBYachts.Notification.IManager;
using BnBYachts.Notification.Notification.Transferables;
using BnByachts.NotificationHub.signalRClient;
using Volo.Abp.ObjectMapping;

namespace BnByachts.NotificationHub.Consumers
{
    public class NotificationConsumer : IConsumer<INotificationContract>
    {

        private readonly INotificationManager _notificationManager;
        private readonly IObjectMapper<NotificationHubModule> _objectMapper;
        public NotificationConsumer(INotificationManager notificationManager, 
            IObjectMapper<NotificationHubModule> objectMapper)
        {
            _notificationManager = notificationManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<INotificationContract> context)
        {
            await _notificationManager.Insert(_objectMapper.Map<INotificationContract, NotificationTransferable>(context.Message)).ConfigureAwait(false);
            await new SignalRClient()
                .SendMessage(context.Message.UserTo.ToString(), 
                    context.Message.Message).ConfigureAwait(false);
        }
    }
}
