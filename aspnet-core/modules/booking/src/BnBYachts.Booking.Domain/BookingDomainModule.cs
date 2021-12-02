using BnBYachts.Booking.MultiTenancy;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Volo.Abp.AuditLogging;
using Volo.Abp.Emailing;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;

namespace BnBYachts.Booking
{
    [DependsOn(
        typeof(BookingDomainSharedModule),
        typeof(AbpAuditLoggingDomainModule)
    //typeof(AbpBackgroundJobsDomainModule),
    //typeof(AbpFeatureManagementDomainModule),
    //typeof(AbpIdentityDomainModule),
    //typeof(AbpPermissionManagementDomainIdentityModule),
    //typeof(AbpIdentityServerDomainModule),
    //typeof(AbpPermissionManagementDomainIdentityServerModule),
    //typeof(AbpSettingManagementDomainModule),
    //typeof(AbpTenantManagementDomainModule),
    //typeof(AbpEmailingModule)
    )]
    public class BookingDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpMultiTenancyOptions>(options =>
            {
                options.IsEnabled = MultiTenancyConsts.IsEnabled;
            });

#if DEBUG
            context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
        }
    }
}
