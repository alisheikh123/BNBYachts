
using System;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;

namespace BnBYachts.EventBusShared.Consumers
{
    public class HeartbeatConsumer : IConsumer<IHeartbeatContract>
    {
        public  Task Consume(ConsumeContext<IHeartbeatContract> context)
        {
            Console.WriteLine(context.Message.Message.ToString());
            return Task.CompletedTask;
        }
    }
}
