
using System.Collections.Specialized;
using BnByachts.BackgroundWorker.Consumers;
using BnBYachts.EventBusShared;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.BackgroundJobs.Quartz;
using Volo.Abp.Modularity;
using Volo.Abp.Quartz;

namespace BnByachts.BackgroundWorker
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule)
      //  typeof(AbpBackgroundJobsQuartzModule)
    )]
    public class BackgroundWorkerModule : AbpModule
    {

        
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AWSOptions>(context.Services.GetConfiguration().GetSection("AWSConfiguation"));
            context.Services.AddMassTransit(mt =>
            {
                mt.AddConsumer<S3FileConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QS3BackgroundWorker;
                });
            });
        }

    }
}
