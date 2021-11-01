using BnBYachts.Booking.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace BnBYachts.Booking.Permissions
{
    public class BookingPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(BookingPermissions.GroupName);
            //Define your own permissions here. Example:
            //myGroup.AddPermission(BookingPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<BookingResource>(name);
        }
    }
}
