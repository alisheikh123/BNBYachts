using BnBYachts.Payments.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Payments.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(PaymentsEntityFrameworkCoreModule),
        typeof(PaymentsApplicationContractsModule)
        )]
    public class PaymentsDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
