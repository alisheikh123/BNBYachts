using Volo.Abp.Settings;

namespace BnBYachts.Captain.Settings
{
    public class CaptainSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(CaptainSettings.MySetting1));
        }
    }
}
