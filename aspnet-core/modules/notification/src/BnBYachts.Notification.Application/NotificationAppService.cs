using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Notification.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Notification;

/* Inherit your application services from this class.
 */
public abstract class NotificationAppService : ApplicationService
{
    protected NotificationAppService()
    {
        LocalizationResource = typeof(NotificationResource);
    }
}
