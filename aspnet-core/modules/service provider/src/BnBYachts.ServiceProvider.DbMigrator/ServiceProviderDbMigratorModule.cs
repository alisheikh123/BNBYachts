using BnBYachts.ServiceProvider.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.ServiceProvider.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(ServiceProviderEntityFrameworkCoreModule),
        typeof(ServiceProviderApplicationContractsModule)
        )]
    public class ServiceProviderDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
