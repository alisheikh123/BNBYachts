using BnBYachts.Booking.DTO;
using BnBYachts.EventBusShared;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

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
