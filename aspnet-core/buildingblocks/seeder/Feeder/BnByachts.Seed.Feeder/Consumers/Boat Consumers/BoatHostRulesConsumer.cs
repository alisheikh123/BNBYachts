using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class BoatHostRulesConsumer : IConsumer<IHostBoatRulesContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public BoatHostRulesConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IHostBoatRulesContract> context)
        {
            var response = _objectMapper.Map<IHostBoatRulesContract, BoatRulesMapperRequestable>(context.Message);
            await _hostBoatManager.InsertBoatRules(response);
        }
    }
}
