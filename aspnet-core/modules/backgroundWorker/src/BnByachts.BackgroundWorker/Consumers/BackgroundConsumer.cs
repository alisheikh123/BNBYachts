using System;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;

namespace BnByachts.BackgroundWorker.Consumers
{
    public class BackgroundConsumer : IConsumer<IBackgroundContract>
    {
        public Task Consume(ConsumeContext<IBackgroundContract> context)
        {
            throw new NotImplementedException();
        }
    }
}
