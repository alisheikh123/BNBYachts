using BnBYachts.Booking.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Booking.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(BookingEntityFrameworkCoreModule),
        typeof(BookingApplicationContractsModule)
        )]
    public class BookingDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
