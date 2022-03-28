using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using System.Threading.Tasks;
using BnByachts.NotificationHub.signalRClient;

namespace BnByachts.NotificationHub.Consumers
{
    public class NotificationConsumer : IConsumer<INotificationContract>
    {

        public async Task Consume(ConsumeContext<INotificationContract> context)
        {
            await new SignalRClient()
                .SendMessage(context.Message.UserTo.ToString(), 
                    context.Message.Message).ConfigureAwait(false);
        }
    }
}
