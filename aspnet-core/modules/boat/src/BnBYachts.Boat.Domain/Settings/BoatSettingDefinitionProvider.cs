using Volo.Abp.Settings;

namespace BnBYachts.Boat.Settings
{
    public class BoatSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(BoatSettings.MySetting1));
        }
    }
}
