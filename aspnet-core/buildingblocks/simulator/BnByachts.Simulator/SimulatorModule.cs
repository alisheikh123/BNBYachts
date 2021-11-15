using System;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Consumers;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace BnByachts.Simulator
{

    [DependsOn(
        //typeof(AbpEventBusRabbitMqModule),
        typeof(AbpAutofacModule)
    )]
    public class SimulatorModule : AbpModule
   {
       public override void ConfigureServices(ServiceConfigurationContext context)
       {

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
               mt.AddConsumer<HeartbeatConsumer>().Endpoint(e => {
                   e.Name = EventBusQueue.HeartBeat;
               });

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
            //context.Services.AddHostedService<QueueListener>();
            //Configure<AbpRabbitMqEventBusOptions>(options =>
            //{
            //    options.ClientName = "SimulatorApp";
            //    options.ExchangeName = "TestMessage";
            //});
        }
       public static void RegisterEndpointMap(string queueHost)
       {
           EndpointConvention.Map<IHeartbeatContract>(new Uri($"{queueHost}/{EventBusQueue.HeartBeat}"));

       }


    }
}