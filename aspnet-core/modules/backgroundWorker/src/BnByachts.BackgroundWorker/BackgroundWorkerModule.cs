﻿
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
        typeof(AbpAutofacModule),
        typeof(AbpBackgroundJobsQuartzModule)
    )]
    public class BackgroundWorkerModule : AbpModule
    {

        public override void PreConfigureServices(ServiceConfigurationContext context)
        {

            if(false)
            {
                var configuration = context.Services.GetConfiguration();

                PreConfigure<AbpQuartzOptions>(options =>
                {
                    options.Properties = new NameValueCollection
                    {
                        ["quartz.jobStore.dataSource"] = "BackgroundJobsDemoApp",
                        ["quartz.jobStore.type"] = "Quartz.Impl.AdoJobStore.JobStoreTX, Quartz",
                        ["quartz.jobStore.tablePrefix"] = "QRTZ_",
                        ["quartz.serializer.type"] = "json",
                        ["quartz.dataSource.BackgroundJobsDemoApp.connectionString"] =
                            configuration.GetConnectionString("Quartz"),
                        ["quartz.dataSource.BackgroundJobsDemoApp.provider"] = "SqlServer",
                        ["quartz.jobStore.driverDelegateType"] = "Quartz.Impl.AdoJobStore.SqlServerDelegate, Quartz",
                    };
                });
            }
        }
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
