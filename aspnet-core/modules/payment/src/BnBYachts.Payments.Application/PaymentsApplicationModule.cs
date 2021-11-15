using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnBYachts.Payments
{
    [DependsOn(
        typeof(PaymentsDomainModule),
        typeof(PaymentsApplicationContractsModule)
        )]
    public class PaymentsApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<PaymentsApplicationModule>();
            });
        }
    }
}
