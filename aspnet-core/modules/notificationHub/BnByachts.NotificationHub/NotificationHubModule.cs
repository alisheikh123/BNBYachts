
using BnBYachts.EventBusShared;
using BnByachts.NotificationHub.Consumers;
using MassTransit;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnByachts.NotificationHub
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule)
    )]
    public class NotificationHubModule: AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddMassTransit(mt =>
            {
                mt.AddConsumer<EmailConsumer>().Endpoint(e => {
                    e.Name = EventBusQueue.QEmailNotification;
                });
            });
        }
    }
}
