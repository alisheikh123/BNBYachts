using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class EventsConsumer : IConsumer<IEventsContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public EventsConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IEventsContract> context)
        {
            var response= _objectMapper.Map<IEventsContract, EventsMapperRequestable>(context.Message);
            await _hostBoatManager.InsertEvents(response);
        }
    }
}
