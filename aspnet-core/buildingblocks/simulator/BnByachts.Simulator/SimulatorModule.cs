using BnBYachts.EventBusShared;
using BnByachts.Simulator.Handler;
using MassTransit;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace BnByachts.Simulator
{

    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(EventBusSharedModule)
    )]
    public class SimulatorModule : AbpModule
   {
       public override void ConfigureServices(ServiceConfigurationContext context)
       {
           context.Services.AddMassTransit(mt =>
           {
               mt.AddConsumer<HeartbeatConsumer>().Endpoint(e => {
                   e.Name = EventBusQueue.HeartBeat;
               });
           });
        }
    }
}