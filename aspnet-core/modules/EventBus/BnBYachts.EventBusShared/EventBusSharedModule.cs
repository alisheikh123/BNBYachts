using System;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.EventBusShared.HostedServices;
using BnBYachts.EventBusShared.Model;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace BnBYachts.EventBusShared
{
    

    public class EventBusSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
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
            EndpointConvention.Map<IHeartbeatContract>(new Uri($"{queueHost}/{EventBusQueue.HeartBeat}"));
            EndpointConvention.Map<IHostBoatContract>(new Uri($"{queueHost}/{EventBusQueue.QBoatSeeder}"));
            EndpointConvention.Map<IHostBoatGalleryContract>(new Uri($"{queueHost}/{EventBusQueue.QBoatGallerySeeder}"));
            EndpointConvention.Map<IHostBoatRulesContract>(new Uri($"{queueHost}/{EventBusQueue.QBoatRulesSeeder}"));
            EndpointConvention.Map<IHostBoatCalendarContract>(new Uri($"{queueHost}/{EventBusQueue.QBoatCalendarSeeder}"));
            EndpointConvention.Map<IHostBoatFeaturesContract>(new Uri($"{queueHost}/{EventBusQueue.QBoatFeatureSeeder}"));
            EndpointConvention.Map<IRuleContract>(new Uri($"{queueHost}/{EventBusQueue.QRulesSeeder}"));
            EndpointConvention.Map<IChartersContract>(new Uri($"{queueHost}/{EventBusQueue.QCharterSeeder}"));
            EndpointConvention.Map<IEventsContract>(new Uri($"{queueHost}/{EventBusQueue.QEventSeeder}"));
            EndpointConvention.Map<IRolesContract>(new Uri($"{queueHost}/{EventBusQueue.QRoleSeeder}"));
            EndpointConvention.Map<IUserRolesContract>(new Uri($"{queueHost}/{EventBusQueue.QUserRoleSeeder}"));
            EndpointConvention.Map<IUserContract>(new Uri($"{queueHost}/{EventBusQueue.QUsersSeeder}"));
            EndpointConvention.Map<IEmailContract>(new Uri($"{queueHost}/{EventBusQueue.QEmailNotification}"));
            EndpointConvention.Map<IEmailContract>(new Uri($"{queueHost}/{EventBusQueue.QBackgroundWorker}"));
        }
    }




}
