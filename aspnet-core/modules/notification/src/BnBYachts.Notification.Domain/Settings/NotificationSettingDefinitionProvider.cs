using Volo.Abp.Settings;

namespace BnBYachts.Notification.Settings;

public class NotificationSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(NotificationSettings.MySetting1));
    }
}
