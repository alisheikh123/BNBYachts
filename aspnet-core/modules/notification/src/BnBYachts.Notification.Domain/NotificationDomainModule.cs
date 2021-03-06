using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using BnBYachts.Notification.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.AutoMapper;
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
using BnBYachts.EventBusShared;

namespace BnBYachts.Notification;

[DependsOn(
    typeof(NotificationDomainSharedModule),
    typeof(AbpAuditLoggingDomainModule),
    typeof(EventBusSharedModule),
    //typeof(AbpBackgroundJobsDomainModule),
    //typeof(AbpFeatureManagementDomainModule),
    //typeof(AbpIdentityDomainModule),
    //typeof(AbpPermissionManagementDomainIdentityModule),
    //typeof(AbpIdentityServerDomainModule),
    //typeof(AbpPermissionManagementDomainIdentityServerModule),
    //typeof(AbpSettingManagementDomainModule),
    //typeof(AbpTenantManagementDomainModule),
    //typeof(AbpEmailingModule),
    typeof(AbpAutoMapperModule)
)]
public class NotificationDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAutoMapperObjectMapper<NotificationDomainModule>();
        //Configure<AbpMultiTenancyOptions>(options =>
        //{
        //    options.IsEnabled = MultiTenancyConsts.IsEnabled;
        //});
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<NotificationDomainModule>();
        });


#if DEBUG
        ///  context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
    }
}
