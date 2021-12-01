using BnBYachts.Payments.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;

namespace BnBYachts.Payments
{
    [DependsOn(
        typeof(PaymentsDomainSharedModule),
        typeof(AbpAuditLoggingDomainModule)
    )]
    public class PaymentsDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpMultiTenancyOptions>(options =>
            {
                options.IsEnabled = MultiTenancyConsts.IsEnabled;
            });
            
        }
    }
}
