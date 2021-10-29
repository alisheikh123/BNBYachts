using BnBYachts.ServiceProvider.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace BnBYachts.ServiceProvider.Permissions
{
    public class ServiceProviderPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(ServiceProviderPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(ServiceProviderPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<ServiceProviderResource>(name);
        }
    }
}
