using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Volo.Abp.ObjectMapping;

namespace BnByachts.SeedObservable.Consumers
{
    public class CharterConsumer : IConsumer<IChartersContract>
    {
        private readonly IHostBoatSeederManager _hostBoatManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public CharterConsumer(IHostBoatSeederManager hostBoatManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _hostBoatManager = hostBoatManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IChartersContract> context)
        {
            var response= _objectMapper.Map<IChartersContract, ChartersMapperRequestable>(context.Message);
            await _hostBoatManager.InsertCharters(response);
        }
    }
}
