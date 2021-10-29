using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Boat.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Boat.EntityFrameworkCore
{
    public class EntityFrameworkCoreBoatDbSchemaMigrator
        : IBoatDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreBoatDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the BoatDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<BoatDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
