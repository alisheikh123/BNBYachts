
using System;
using BnBYachts.EventBusShared;
using BnByachts.NotificationHub.Configuration;
using BnByachts.NotificationHub.Consumers;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using BnBYachts.Notification;
using BnBYachts.Notification.MongoDB;

namespace BnByachts.NotificationHub
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule),
        typeof(NotificationDomainModule),
        typeof(NotificationDomainSharedModule),
        typeof(NotificationMongoDbModule)
    )]
    public class NotificationHubModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAssemblyOf<NotificationHubModule>();
            context.Services.AddAutoMapperObjectMapper<NotificationHubModule>();
            context.Services.Configure<SmtpSettings>(context.Services.GetConfiguration().GetSection("Settings"));
            context.Services.Configure<OTPMessageSetting>(context.Services.GetConfiguration().GetSection("OTPSetting"));
            context.Services.AddMassTransit(mt =>
            {
                mt.AddConsumer<EmailConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QEmailNotification;
                });
                mt.AddConsumer<OTPConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QGenerateOTP;
                });

                mt.AddConsumer<NotificationConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QNotification;
                });
            });
        }
    }
}
