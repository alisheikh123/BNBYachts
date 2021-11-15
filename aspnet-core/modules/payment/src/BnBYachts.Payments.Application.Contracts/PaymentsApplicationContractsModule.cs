using Volo.Abp.Modularity;


namespace BnBYachts.Payments
{
    [DependsOn(
        typeof(PaymentsDomainSharedModule)
    )]
    public class PaymentsApplicationContractsModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            PaymentsDtoExtensions.Configure();
        }
    }
}
