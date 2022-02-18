using BnBYachts.Core.IdentityServer;
using Microsoft.EntityFrameworkCore;
using System;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Threading;

namespace BnBYachts.Core.EntityFrameworkCore
{
    public static class CoreEfCoreEntityExtensionMappings
    {
        private static readonly OneTimeRunner OneTimeRunner = new OneTimeRunner();

        public static void Configure()
        {
            CoreGlobalFeatureConfigurator.Configure();
            CoreModuleExtensionConfigurator.Configure();

            OneTimeRunner.Run(() => 
            {
                ObjectExtensionManager.Instance
                .MapEfCoreProperty<IdentityUser, string>
                    (nameof(AppUser.ImagePath));
                ObjectExtensionManager.Instance
                .MapEfCoreProperty<IdentityUser, string>
                    (nameof(AppUser.EmailConfirmationToken));
                ObjectExtensionManager.Instance
               .MapEfCoreProperty<IdentityUser, DateTime>
                   (nameof(AppUser.DOB));
                ObjectExtensionManager.Instance
              .MapEfCoreProperty<IdentityUser, string>
                  (nameof(AppUser.About));
                ObjectExtensionManager.Instance
            .MapEfCoreProperty<IdentityUser, bool>
                (nameof(AppUser.IsInitialLogin));
                ObjectExtensionManager.Instance
           .MapEfCoreProperty<IdentityUser, bool>
               (nameof(AppUser.IsActive));
            });
        }
    }
}