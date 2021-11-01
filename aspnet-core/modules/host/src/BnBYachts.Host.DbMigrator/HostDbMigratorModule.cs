using BnBYachts.Host.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Host.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(HostEntityFrameworkCoreModule),
        typeof(HostApplicationContractsModule)
        )]
    public class HostDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
