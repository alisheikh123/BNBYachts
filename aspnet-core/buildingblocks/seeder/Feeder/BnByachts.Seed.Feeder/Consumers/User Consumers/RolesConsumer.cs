using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.ObjectMapping;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;

namespace BnByachts.SeedObservable.Consumers
{
    public class RolesConsumer : IConsumer<IRolesContract>
    {
        private readonly IAppUserManager _appUserManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public RolesConsumer(IAppUserManager appUserManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _appUserManager = appUserManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IRolesContract> context)
        {
            var response= _objectMapper.Map<IRolesContract, RolesRequestable>(context.Message);
        }
    }
}
