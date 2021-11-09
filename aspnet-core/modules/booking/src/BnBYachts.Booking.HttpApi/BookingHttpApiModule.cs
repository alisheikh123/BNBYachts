using Volo.Abp.Modularity;
namespace BnBYachts.Booking
{
    [DependsOn(
        typeof(BookingApplicationContractsModule)
        //typeof(AbpAccountHttpApiModule),
        //typeof(AbpIdentityHttpApiModule),
        //typeof(AbpPermissionManagementHttpApiModule),
        //typeof(AbpTenantManagementHttpApiModule),
        //typeof(AbpFeatureManagementHttpApiModule),
        //typeof(AbpSettingManagementHttpApiModule)
        )]
    public class BookingHttpApiModule : AbpModule
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
            //        .Get<BookingResource>()
            //        .AddBaseTypes(
            //            typeof(AbpUiResource)
            //        );
            //});
        }
    }
}
