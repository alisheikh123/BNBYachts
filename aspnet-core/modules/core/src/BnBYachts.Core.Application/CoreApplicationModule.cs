using BnBYachts.Core.Requestable;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Core.Shared.DTO;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BnBYachts.Core
{
    [DependsOn(
        typeof(CoreDomainModule),
        typeof(AbpAccountApplicationModule),
        typeof(CoreApplicationContractsModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpTenantManagementApplicationModule),
        typeof(AbpFeatureManagementApplicationModule),
        typeof(AbpSettingManagementApplicationModule)
        )]
    public class CoreApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.Configure<AdminConfigurations>(context.Services.GetConfiguration().GetSection("AdminConfigurations"));
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<CoreApplicationModule>();
            });
        }
    }
}
