using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.SharedModule;
using MassTransit;

namespace BnByachts.SeedObservable.Consumers
{
    public class BoatHostConsumer : IConsumer<IHostBoatContract>
    {
        private readonly IHostBoatManager _hostBoatManager;
        public BoatHostConsumer(IHostBoatManager hostBoatManager)
        {
            _hostBoatManager = hostBoatManager;
        }
        public async Task Consume(ConsumeContext<IHostBoatContract> context)
        {
             await _hostBoatManager.Insert(new HostBoatRequestable());
        }
    }
}
