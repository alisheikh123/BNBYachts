using Volo.Abp.Settings;

namespace BnBYachts.ServiceProvider.Settings
{
    public class ServiceProviderSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(ServiceProviderSettings.MySetting1));
        }
    }
}
