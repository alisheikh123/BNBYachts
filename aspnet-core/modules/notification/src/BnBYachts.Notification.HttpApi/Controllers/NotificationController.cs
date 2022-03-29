using BnBYachts.Notification.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Notification.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class NotificationController : AbpControllerBase
{
    protected NotificationController()
    {
        LocalizationResource = typeof(NotificationResource);
    }
}
