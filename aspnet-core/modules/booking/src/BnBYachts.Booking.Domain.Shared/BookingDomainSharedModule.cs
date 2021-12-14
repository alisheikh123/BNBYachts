using BnBYachts.Booking.Localization;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.IdentityServer;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;

namespace BnBYachts.Booking
{
    [DependsOn(
        typeof(AbpAuditLoggingDomainSharedModule)
        //typeof(AbpBackgroundJobsDomainSharedModule),
        //typeof(AbpFeatureManagementDomainSharedModule),
        //typeof(AbpIdentityDomainSharedModule),
        //typeof(AbpIdentityServerDomainSharedModule),
        //typeof(AbpPermissionManagementDomainSharedModule),
        //typeof(AbpSettingManagementDomainSharedModule),
        //typeof(AbpTenantManagementDomainSharedModule)
        )]
    public class BookingDomainSharedModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            BookingGlobalFeatureConfigurator.Configure();
            BookingModuleExtensionConfigurator.Configure();
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<BookingDomainSharedModule>();
            });

            //context.Services.AddAutoMapperObjectMapper<BookingDomainSharedModule>();
            //Configure<AbpAutoMapperOptions>(options =>
            //{
            //    options.AddMaps<SeederObservableModule>();
            //});

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Add<BookingResource>("en")
                    .AddBaseTypes(typeof(AbpValidationResource))
                    .AddVirtualJson("/Localization/Booking");

                options.DefaultResourceType = typeof(BookingResource);
            });

            Configure<AbpExceptionLocalizationOptions>(options =>
            {
                options.MapCodeNamespace("Booking", typeof(BookingResource));
            });
        }
    }
}
