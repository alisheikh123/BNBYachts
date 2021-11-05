using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using BnBYachts.Boat.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.Emailing;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;

namespace BnBYachts.Boat
{
    [DependsOn(
        typeof(BoatDomainSharedModule),
        typeof(AbpAuditLoggingDomainModule)
    )]
    public class BoatDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpMultiTenancyOptions>(options =>
            {
                options.IsEnabled = MultiTenancyConsts.IsEnabled;
            });
            
        }
    }
}
