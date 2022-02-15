using BnBYachts.Booking.DTO;
using BnBYachts.EventBusShared;
using BnBYachts.Shared;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace BnBYachts.Booking
{
    [DependsOn(
        typeof(BookingDomainModule),
        //typeof(AbpAccountApplicationModule),
        typeof(BookingApplicationContractsModule),
         typeof(EventBusSharedModule)
        //typeof(AbpIdentityApplicationModule),
        //typeof(AbpPermissionManagementApplicationModule),
        //typeof(AbpTenantManagementApplicationModule),
        //typeof(AbpFeatureManagementApplicationModule),
        //typeof(AbpSettingManagementApplicationModule)

        )]
    public class BookingApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.Configure<AWSOptions>(context.Services.GetConfiguration().GetSection("AWSConfiguation"));
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<BookingApplicationModule>();
            });
        }
    }
}
