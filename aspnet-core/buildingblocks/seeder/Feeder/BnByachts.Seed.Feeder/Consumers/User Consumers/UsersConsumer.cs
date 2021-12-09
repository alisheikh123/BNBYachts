using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.ObjectMapping;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Interface;
using Volo.Abp.Data;

namespace BnByachts.SeedObservable.Consumers
{
    [ConnectionStringName("AbpIdentityServer")]
    public class UsersConsumer : IConsumer<IUserContract>
    {
        private readonly IAppUserManager _appUserManager;
        private readonly IObjectMapper<SeederObservableModule> _objectMapper;
        public UsersConsumer(IAppUserManager appUserManager, IObjectMapper<SeederObservableModule> objectMapper)
        {
            _appUserManager = appUserManager;
            _objectMapper = objectMapper;
        }
        public async Task Consume(ConsumeContext<IUserContract> context)
        {
            var response= _objectMapper.Map<IUserContract, UserRequestable>(context.Message);
            await _appUserManager.InsertUsers(response);
        }
    }
}
