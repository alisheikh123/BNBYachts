using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BnBYachts.Notification
{

    [DependsOn(
        typeof(NotificationDomainSharedModule),
        typeof(AbpAccountApplicationContractsModule),
        typeof(AbpObjectExtendingModule)
    )]
    public class NotificationApplicationContractsModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            NotificationDtoExtensions.Configure();
        }
    }
}
