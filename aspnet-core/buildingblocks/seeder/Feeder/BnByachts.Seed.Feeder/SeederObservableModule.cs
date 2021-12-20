
using BnBYachts.EventBusShared;
using MassTransit;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using BnBYachts.Boat;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Boat.EntityFrameworkCore;
using BnByachts.SeedObservable.Consumers;
using BnBYachts.Core.EntityFrameworkCore;
using BnBYachts.Core;

namespace BnByachts.SeedObservable
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule),
        typeof(BoatApplicationModule),
        typeof(BoatEntityFrameworkCoreModule),
        typeof(CoreApplicationModule),
        typeof(CoreEntityFrameworkCoreModule)

    )]
    public class SeederObservableModule : AbpModule
    {

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAssemblyOf<SeederObservableModule>();

            context.Services.AddAutoMapperObjectMapper<SeederObservableModule>();

            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<SeederObservableModule>();
            });

            context.Services.AddMassTransit(mt =>
            {
                mt.AddConsumer<RolesConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QRoleSeeder;
                });
                mt.AddConsumer<UsersConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QUsersSeeder;
                });
                mt.AddConsumer<BoatHostConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QBoatSeeder;
                });
                mt.AddConsumer<FeaturesConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QFeatureSeeder;
                });

                mt.AddConsumer<RulesConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QRulesSeeder;
                });
                mt.AddConsumer<BoatHostGalleryConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QBoatGallerySeeder;
                });
                mt.AddConsumer<BoatHostCalendarConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QBoatCalendarSeeder;
                });


                mt.AddConsumer<BoatHostFeatureConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QBoatFeatureSeeder;
                });

                mt.AddConsumer<BoatHostRulesConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QBoatRulesSeeder;
                });
                mt.AddConsumer<CharterConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QCharterSeeder;
                });
                mt.AddConsumer<EventsConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QEventSeeder;
                });
            });

        }
    }
}


