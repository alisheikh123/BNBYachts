
using BnBYachts.EventBusShared;
using BnByachts.NotificationHub.Configuration;
using BnByachts.NotificationHub.Consumers;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Emailing;
using Volo.Abp.Modularity;

namespace BnByachts.NotificationHub
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule),
        typeof(AbpEmailingModule)
    )]
    public class NotificationHubModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.Configure<SmtpSettings>(context.Services.GetConfiguration().GetSection("Settings"));
            context.Services.AddMassTransit(mt =>
            {
                mt.AddConsumer<EmailConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QEmailNotification;
                });
            });
        }
    }
}
