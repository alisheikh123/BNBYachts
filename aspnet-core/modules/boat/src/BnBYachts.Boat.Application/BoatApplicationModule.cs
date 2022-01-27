using System;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.Timing;

namespace BnBYachts.Boat
{
    [DependsOn(
        typeof(BoatDomainModule),
        //typeof(AbpAccountApplicationModule),
        typeof(BoatApplicationContractsModule)
        //typeof(AbpIdentityApplicationModule)
        //typeof(AbpPermissionManagementApplicationModule),
        //typeof(AbpTenantManagementApplicationModule),
        //typeof(AbpFeatureManagementApplicationModule),
        //typeof(AbpSettingManagementApplicationModule)
        )]
    public class BoatApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<BoatApplicationModule>();
            });
            Configure<AbpClockOptions>(options =>
            {
                options.Kind = DateTimeKind.Local;
            });
        }
    }
}
