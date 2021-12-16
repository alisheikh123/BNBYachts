using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class FeaturesConsumer : IConsumer<IFeatureContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public FeaturesConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IFeatureContract> context)
        {
            var response= _objectMapper.Map<IFeatureContract, FeaturesRequestable>(context.Message);
            await _hostBoatManager.InsertFeatures(response);
        }
    }
}
