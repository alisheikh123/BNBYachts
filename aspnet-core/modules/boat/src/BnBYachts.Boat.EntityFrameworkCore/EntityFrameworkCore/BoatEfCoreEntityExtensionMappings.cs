using Microsoft.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Threading;

namespace BnBYachts.Boat.EntityFrameworkCore
{
    public static class BoatEfCoreEntityExtensionMappings
    {
        private static readonly OneTimeRunner OneTimeRunner = new OneTimeRunner();

        public static void Configure()
        {
            BoatGlobalFeatureConfigurator.Configure();
            BoatModuleExtensionConfigurator.Configure();

            OneTimeRunner.Run(() =>
            {
            });
        }
    }
}
