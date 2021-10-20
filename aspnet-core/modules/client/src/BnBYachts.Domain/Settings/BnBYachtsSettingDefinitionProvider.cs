using Volo.Abp.Settings;

namespace BnBYachts.Settings
{
    public class BnBYachtsSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(BnBYachtsSettings.MySetting1));
        }
    }
}
