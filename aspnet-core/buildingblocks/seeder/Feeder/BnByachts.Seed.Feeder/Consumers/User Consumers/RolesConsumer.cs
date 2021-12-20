using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.ObjectMapping;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Transferable;

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
            await _appUserManager.AddRoles(new RolesTransferable
            {
                Id = context.Message.Id,
                Name= context.Message.Name,
                NormalizedName = context.Message.NormalizedName,
                IsStatic = context.Message.IsStatic,
                IsDefault = context.Message.IsDefault,
                IsPublic = context.Message.IsPublic

            }).ConfigureAwait(false);
        }
    }
}
