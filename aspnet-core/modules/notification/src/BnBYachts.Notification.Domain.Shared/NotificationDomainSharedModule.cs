using Volo.Abp.AuditLogging;
using Volo.Abp.Modularity;

namespace BnBYachts.Notification
{

    [DependsOn(
        typeof(AbpAuditLoggingDomainSharedModule)
    )]
    public class NotificationDomainSharedModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            NotificationGlobalFeatureConfigurator.Configure();
            NotificationModuleExtensionConfigurator.Configure();
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            //Configure<AbpVirtualFileSystemOptions>(options =>
            //{
            //    options.FileSets.AddEmbedded<NotificationDomainSharedModule>();
            //});

            //Configure<AbpLocalizationOptions>(options =>
            //{
            //    options.Resources
            //        .Add<NotificationResource>("en")
            //        .AddBaseTypes(typeof(AbpValidationResource))
            //        .AddVirtualJson("/Localization/Notification");

            //    options.DefaultResourceType = typeof(NotificationResource);
            //});

            //Configure<AbpExceptionLocalizationOptions>(options =>
            //{
            //    options.MapCodeNamespace("Notification", typeof(NotificationResource));
            //});
        }
    }
}