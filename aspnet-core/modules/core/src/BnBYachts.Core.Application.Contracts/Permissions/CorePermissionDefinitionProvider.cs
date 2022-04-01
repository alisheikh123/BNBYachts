using BnBYachts.Core.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace BnBYachts.Core.Permissions
{
    public class CorePermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(CorePermissions.GroupName);
            //Define your own permissions here. Example:
            var newsLetterPermission = myGroup.AddPermission(CorePermissions.CoreNewsLetterPermissions.Default, L("Permission:Core"));
            newsLetterPermission.AddChild(CorePermissions.CoreNewsLetterPermissions.View, L("Permission:NewsLetter.View"));
            newsLetterPermission.AddChild(CorePermissions.CoreNewsLetterPermissions.Create, L("Permission:NewsLetter.Create"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<CoreResource>(name);
        }
    }
}
