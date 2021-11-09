using BnBYachts.EventBusShared.HostedServices;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Domain.Entities.Events.Distributed;
using Volo.Abp.EventBus;
using Volo.Abp.EventBus.RabbitMq;
using Volo.Abp.Modularity;
using Volo.Abp.RabbitMQ;

namespace BnBYachts.EventBusShared
{
    [DependsOn(
        typeof(AbpEventBusRabbitMqModule)
    )]
    public class EventBusSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            //...
            context.Services.AddHostedService<HeartbeatHostedService>();

            //Configure<AbpRabbitMqOptions>(options =>
            //{
            //    options.Connections.Default.UserName = "guest";
            //    options.Connections.Default.Password = "guest";
            //    options.Connections.Default.HostName = "rabbitmq://localhost";
            //    options.Connections.Default.Port = 15672;
            //});

                Configure<AbpRabbitMqEventBusOptions>(options =>
                {
                    options.ClientName = "SimulatorApp";
                    options.ExchangeName = "TestMessage";
                });
        }
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            PreConfigure<AbpEventBusOptions>(options =>
            {
                options.EnabledErrorHandle = true;
                options.DeadLetterName = EventBusQueue.DeadQueue;
                options.UseRetryStrategy(retryStrategyOptions =>
                {
                    retryStrategyOptions.IntervalMillisecond = 0;
                    retryStrategyOptions.MaxRetryAttempts = 1;
                });
            });
        }
    }


}
