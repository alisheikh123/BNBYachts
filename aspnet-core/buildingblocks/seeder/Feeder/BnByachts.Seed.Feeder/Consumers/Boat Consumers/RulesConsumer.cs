using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class RulesConsumer : IConsumer<IRuleContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public RulesConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IRuleContract> context)
        {
            var response= _objectMapper.Map<IRuleContract, RulesRequestable>(context.Message);
            await _hostBoatManager.InsertRules(response);
        }
    }
}
