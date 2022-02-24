
using BnBYachts.EventBusShared;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnBYachts.ElasticSearch.Bkworker
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule),
        typeof(TechverxElasticSearchModule)
    )]
    public class ElasticSearchBkworkerModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAssemblyOf<ElasticSearchBkworkerModule>();

            context.Services.AddAutoMapperObjectMapper<ElasticSearchBkworkerModule>();

            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<ElasticSearchBkworkerModule>();
            });

            context.Services.AddMassTransit(mt =>
            {
                
               
            });

        }
    }
}
