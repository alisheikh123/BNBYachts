using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using BnBYachts.Boat.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.AutoMapper;
using Volo.Abp.Emailing;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;

namespace BnBYachts.Boat
{
    [DependsOn(
        typeof(BoatDomainSharedModule),
        typeof(AbpAuditLoggingDomainModule),
        typeof(AbpAutoMapperModule)
    )]
    public class BoatDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAutoMapperObjectMapper<BoatDomainModule>();
            Configure<AbpMultiTenancyOptions>(options =>
            {
                options.IsEnabled = MultiTenancyConsts.IsEnabled;
            });

            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<BoatDomainModule>(validate: false);
            });

        }
    }
}
