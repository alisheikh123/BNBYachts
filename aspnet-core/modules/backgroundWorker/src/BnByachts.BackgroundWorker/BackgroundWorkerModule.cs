using BnByachts.BackgroundWorker.Consumers;
using BnBYachts.EventBusShared;
using MassTransit;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnByachts.BackgroundWorker
{
    [DependsOn(
        typeof(EventBusSharedModule),
        typeof(AbpAutoMapperModule),
        typeof(AbpAutofacModule)
    )]
    public class BackgroundWorkerModule:AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddMassTransit(mt =>
            {
                mt.AddConsumer<BackgroundConsumer>().Endpoint(e =>
                {
                    e.Name = EventBusQueue.QBackgroundWorker;
                });
            });
        }
    }
}
