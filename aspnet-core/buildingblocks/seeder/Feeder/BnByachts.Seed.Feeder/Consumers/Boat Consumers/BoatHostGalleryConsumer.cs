using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class BoatHostGalleryConsumer : IConsumer<IHostBoatGalleryContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public BoatHostGalleryConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IHostBoatGalleryContract> context)
        {
            var response = _objectMapper.Map<IHostBoatGalleryContract, BoatGalleryRequestable>(context.Message);
            await _hostBoatManager.InsertBoatGallery(response);
        }
    }
}
