using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.ObjectMapping;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Interface;

namespace BnByachts.SeedObservable.Consumers
{
    public class UserRolesConsumer : IConsumer<IUserRolesContract>
    {
        private readonly IAppUserManager _appUserManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public UserRolesConsumer(IAppUserManager appUserManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _appUserManager = appUserManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IUserRolesContract> context)
        {
            var response= _objectMapper.Map<IUserRolesContract, UserRolesRequestable>(context.Message);
        }
    }
}
