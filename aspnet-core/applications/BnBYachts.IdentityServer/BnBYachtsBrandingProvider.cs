using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace BnBYachts
{
    [Dependency(ReplaceServices = true)]
    public class BnBYachtsBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "BnBYachts";
    }
}
