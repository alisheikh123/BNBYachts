using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class BoatHostFeatureConsumer : IConsumer<IHostBoatFeaturesContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public BoatHostFeatureConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IHostBoatFeaturesContract> context)
        {
            var response = _objectMapper.Map<IHostBoatFeaturesContract, BoatFeaturesMapperRequestable>(context.Message);
            await _hostBoatManager.InsertBoatFeatures(response);
        }
    }
}
