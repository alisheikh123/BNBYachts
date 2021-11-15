using Volo.Abp.Modularity;

namespace BnBYachts.Payments
{
    [DependsOn(
        typeof(PaymentsApplicationContractsModule)
        )]
    public class PaymentsHttpApiModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            ConfigureLocalization();
        }

        private void ConfigureLocalization()
        {
            //Configure<AbpLocalizationOptions>(options =>
            //{
            //    options.Resources
            //        .Get<PaymentsResource>()
            //        .AddBaseTypes(
            //            typeof(AbpUiResource)
            //        );
            //});
        }
    }
}
