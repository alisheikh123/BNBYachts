using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using System.Threading.Tasks;
using BnBYachts.Notification.IManager;
using BnBYachts.Notification.Notification.Transferables;
using BnByachts.NotificationHub.Configuration;
using BnByachts.NotificationHub.signalRClient;
using Microsoft.Extensions.Options;
using Volo.Abp.ObjectMapping;

namespace BnByachts.NotificationHub.Consumers
{
    public class NotificationConsumer : IConsumer<INotificationContract>
    {

        private readonly INotificationManager _notificationManager;
        private readonly IObjectMapper<NotificationHubModule> _objectMapper;
        private SignalRSettings _signlRSettings { get; }
        public NotificationConsumer(INotificationManager notificationManager,
            IObjectMapper<NotificationHubModule> objectMapper, IOptions<SignalRSettings> signlRSettings)
        {
            _notificationManager = notificationManager;
            _objectMapper = objectMapper;
            _signlRSettings = signlRSettings.Value;
        }
        public async Task Consume(ConsumeContext<INotificationContract> context)
        {
            await _notificationManager.Insert(_objectMapper.Map<INotificationContract,NotificationTransferable>(context.Message)).ConfigureAwait(false);
            await new SignalRClient()
                .SendMessage(context.Message.UserTo.ToString(),
                    context.Message.Message).ConfigureAwait(false);
        }
    }
}
