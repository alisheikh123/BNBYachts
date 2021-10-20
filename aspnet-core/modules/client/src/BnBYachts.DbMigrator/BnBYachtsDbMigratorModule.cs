using BnBYachts.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(BnBYachtsEntityFrameworkCoreModule),
        typeof(BnBYachtsApplicationContractsModule)
        )]
    public class BnBYachtsDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
