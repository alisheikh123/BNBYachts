
using BnBYachts.EventBusShared;
using MassTransit;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using BnBYachts.Boat;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Boat.EntityFrameworkCore;

namespace BnByachts.SeedObservable
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule),
        typeof(BoatApplicationModule),
        typeof(BoatEntityFrameworkCoreModule)
    //typeof(AbpAccountApplicationModule),

    )]
    public class SeederObservableModule : AbpModule
    {
        
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAssemblyOf<SeederObservableModule>();

            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<SeederObservableModule>();
            });

            //context.Services.AddMassTransit(mt =>
            //{
            //    mt.AddConsumer<BoatHostConsumer>().Endpoint(e =>
            //    {
            //        e.Name = EventBusQueue.QSeeder;
            //    });
            //});

        }

        
    }
}


