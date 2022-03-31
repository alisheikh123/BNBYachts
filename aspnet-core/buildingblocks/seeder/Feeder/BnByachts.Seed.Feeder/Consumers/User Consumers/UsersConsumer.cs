using System;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.ObjectMapping;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.Core.Shared.Interface;
using BnBYachts.Core.Shared.Transferable;

namespace BnByachts.SeedObservable.Consumers
{
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
                await _appUserManager.RegisterUser(new UserRegisterTransferable
                {
                    Id = context.Message.Id,
                    Password = context.Message.PasswordHash,
                    DOB = context.Message.DOB,
                    Email = context.Message.Email,
                    FirstName = context.Message.Name,
                    UserName = context.Message.UserName,
                    RoleId = context.Message.RoleName
                }).ConfigureAwait(false);
        }
    }
}
