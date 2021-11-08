using Volo.Abp.Autofac;
using Volo.Abp.EventBus.RabbitMq;
using Volo.Abp.Modularity;

namespace BnByachts.Simulator
{

    [DependsOn(
        typeof(AbpEventBusRabbitMqModule),
        typeof(AbpAutofacModule)
    )]
    public class SimulatorModule : AbpModule
   {
       public override void ConfigureServices(ServiceConfigurationContext context)
       {
           Configure<AbpRabbitMqEventBusOptions>(options =>
           {
               options.ClientName = "umerisCool";
               options.ExchangeName = "uMessages";
           });
       }
   }
}