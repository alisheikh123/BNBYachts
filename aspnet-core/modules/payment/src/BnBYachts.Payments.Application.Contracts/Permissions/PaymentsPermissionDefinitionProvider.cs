using BnBYachts.Payments.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace BnBYachts.Payments.Permissions
{
    public class PaymentsPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(PaymentsPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(PaymentsPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<PaymentsResource>(name);
        }
    }
}
