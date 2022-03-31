
using BnByachts.BackgroundWorker.Consumers;
using BnBYachts.Core.EntityFrameworkCore;
using BnBYachts.EventBusShared;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using System;
using Microsoft.Extensions.Configuration;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.BackgroundJobs.Quartz;
using Volo.Abp.BackgroundWorkers.Quartz;
using Volo.Abp.Modularity;
using Volo.Abp.Quartz;

namespace BnByachts.BackgroundWorker
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule),
        typeof(CoreEntityFrameworkCoreModule),
        typeof(AbpBackgroundWorkersQuartzModule),
        typeof(AbpBackgroundJobsQuartzModule)
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
            PreConfigure<AbpQuartzOptions>(options =>
            {
                var configuration = context.Services.GetConfiguration();
                options.Configurator = configure =>
                {
                    configure.UsePersistentStore(storeOptions =>
                    {
                        storeOptions.UseProperties = true;
                        storeOptions.UseJsonSerializer();
                        storeOptions.UseSqlServer(configuration.GetConnectionString("Quartz"));
                        storeOptions.UseClustering(c =>
                        {
                            c.CheckinMisfireThreshold = TimeSpan.FromSeconds(20);
                            c.CheckinInterval = TimeSpan.FromSeconds(10);
                        });
                    });
                };
            });
        }
    }
}
