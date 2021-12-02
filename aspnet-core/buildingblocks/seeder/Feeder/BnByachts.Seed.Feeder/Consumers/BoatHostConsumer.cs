using System.Threading.Tasks;
using BnBYachts.Boat;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class BoatHostConsumer : IConsumer<IHostBoatContract>
    {
        private readonly IHostBoatManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public BoatHostConsumer(IHostBoatManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IHostBoatContract> context)
        {
            var response= _objectMapper.Map<IHostBoatContract, HostBoatRequestable>(context.Message);
            await _hostBoatManager.Insert(response);
        }
    }
}
