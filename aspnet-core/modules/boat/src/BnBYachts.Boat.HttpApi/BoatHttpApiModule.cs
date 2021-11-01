using BnBYachts.Boat.Localization;
using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BnBYachts.Boat
{
    [DependsOn(
        typeof(BoatApplicationContractsModule)
        //typeof(AbpAccountHttpApiModule),
        //typeof(AbpIdentityHttpApiModule),
        //typeof(AbpPermissionManagementHttpApiModule),
        //typeof(AbpTenantManagementHttpApiModule),
        //typeof(AbpFeatureManagementHttpApiModule),
        //typeof(AbpSettingManagementHttpApiModule)
        )]
    public class BoatHttpApiModule : AbpModule
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
            //        .Get<BoatResource>()
            //        .AddBaseTypes(
            //            typeof(AbpUiResource)
            //        );
            //});
        }
    }
}
