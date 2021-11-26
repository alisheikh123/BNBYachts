using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;

namespace BnBYachts.Core.DbMigrator.Data
{
    public class UserSeederContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IdentityUserManager _identityUserManager;

        public UserSeederContributor(IdentityUserManager identityUserManager)
        {
            _identityUserManager = identityUserManager;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            // Add users
            IdentityUser identityUser1 = new IdentityUser(Guid.NewGuid(), "host1", "host1@email.com");
            await _identityUserManager.CreateAsync(identityUser1, "1q2w3E*");
            await _identityUserManager.AddToRoleAsync(identityUser1, "Host");
            await _identityUserManager.AddToRoleAsync(identityUser1, "User");

            IdentityUser identityUser2 = new IdentityUser(Guid.NewGuid(), "host2", "host-2@email.com");
            await _identityUserManager.CreateAsync(identityUser2, "1q2w3E*");
            await _identityUserManager.AddToRoleAsync(identityUser2, "Host");
            await _identityUserManager.AddToRoleAsync(identityUser2, "User");

            IdentityUser identityUser3 = new IdentityUser(Guid.NewGuid(), "client-1", "client-1@email.com");
            await _identityUserManager.CreateAsync(identityUser3, "1q2w3E*");
            await _identityUserManager.AddToRoleAsync(identityUser3, "User");
            IdentityUser identityUser4 = new IdentityUser(Guid.NewGuid(), "client-2", "client-2@email.com");
            await _identityUserManager.CreateAsync(identityUser4, "1q2w3E*");
            await _identityUserManager.AddToRoleAsync(identityUser4, "User");
        }
    }
}
