using BnBYachts.Captain.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace BnBYachts.Captain.Permissions
{
    public class CaptainPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(CaptainPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(CaptainPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<CaptainResource>(name);
        }
    }
}
