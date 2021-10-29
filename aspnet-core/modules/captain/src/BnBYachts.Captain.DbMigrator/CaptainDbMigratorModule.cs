using BnBYachts.Captain.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Captain.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(CaptainEntityFrameworkCoreModule),
        typeof(CaptainApplicationContractsModule)
        )]
    public class CaptainDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
