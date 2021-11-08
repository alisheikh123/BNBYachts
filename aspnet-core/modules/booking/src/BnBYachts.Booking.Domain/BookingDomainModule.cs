using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using BnBYachts.Booking.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.IdentityServer;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.PermissionManagement.IdentityServer;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

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
