using BnBYachts.Admin.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Admin.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(AdminEntityFrameworkCoreModule),
        typeof(AdminApplicationContractsModule)
        )]
    public class AdminDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
