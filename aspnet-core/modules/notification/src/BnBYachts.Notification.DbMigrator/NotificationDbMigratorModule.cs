using BnBYachts.Notification.MongoDB;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnBYachts.Notification.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(NotificationMongoDbModule),
    typeof(NotificationApplicationContractsModule)
    )]
public class NotificationDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
    }
}
