using BnBYachts.EventBusShared;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace BnByachts.Seeder
{

    [DependsOn(
        typeof(EventBusSharedModule)
    )]
    public class SeederModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
