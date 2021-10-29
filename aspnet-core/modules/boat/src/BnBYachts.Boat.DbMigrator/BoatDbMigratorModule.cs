using BnBYachts.Boat.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Boat.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(BoatEntityFrameworkCoreModule),
        typeof(BoatApplicationContractsModule)
        )]
    public class BoatDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
