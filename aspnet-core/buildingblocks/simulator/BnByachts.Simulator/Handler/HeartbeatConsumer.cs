
using System;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;

namespace BnByachts.Simulator.Handler
{
  public class HeartbeatConsumer : IConsumer<IHeartbeatContract>
    {
        public async Task Consume(ConsumeContext<IHeartbeatContract> context)
        {
            Console.WriteLine(context.Message.Message);
            await Task.CompletedTask;
        }
    }
}
