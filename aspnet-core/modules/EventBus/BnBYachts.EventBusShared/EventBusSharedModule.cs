using System;
using BnBYachts.EventBusShared.Consumers;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.EventBusShared.HostedServices;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp;

namespace BnBYachts.EventBusShared
{
    public class RabbitMqConfigurations
    {
        public string Host { get; set; }
        public string VirtualHost { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    //[DependsOn(
    //    typeof(AbpEventBusRabbitMqModule)
    //)]
    public class EventBusSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            //...
            context.Services.AddHostedService<HeartbeatHostedService>();
            var configuration = context.Services.GetConfiguration();
            var configurations = new RabbitMqConfigurations
            {
                Host = configuration["RabbitMq:Host"],
                VirtualHost = configuration["RabbitMq:VirtualHost"],
                UserName = configuration["RabbitMq:UserName"],
                Password = configuration["RabbitMq:Password"]
            };

            context.Services.AddMassTransit(mt =>
            {
                //mt.AddConsumer<HeartbeatConsumer>().Endpoint(e => {
                //    e.Name = EventBusQueue.HeartBeat;
                //});

                mt.AddBus(bs => Bus.Factory.CreateUsingRabbitMq(sbc =>
                {

                    var queueHost = configurations.Host;
                    sbc.Host(new Uri(queueHost), "/", h =>
                    {
                        h.Username(configurations.UserName);
                        h.Password(configurations.Password);
                    });
                    sbc.ClearMessageDeserializers();
                    sbc.UseRawJsonSerializer();
                    sbc.UseInMemoryOutbox();
                    RegisterEndpointMap(queueHost);
                    sbc.ConfigureEndpoints(bs);
                }));
            });

           
        }

        public override void PreConfigureServices(ServiceConfigurationContext context)
        {

        }

        public static void RegisterEndpointMap(string queueHost)
        {
           // EndpointConvention.Map<IHeartbeatContract>(new Uri($"{queueHost}/{EventBusQueue.HeartBeat}"));
            EndpointConvention.Map<IHeartbeatContract>(new Uri($"{queueHost}/{EventBusQueue.QSeeder}"));
            EndpointConvention.Map<IHeartbeatContract>(new Uri($"{queueHost}/{EventBusQueue.QEmailNotification}"));

        }
    }




}
