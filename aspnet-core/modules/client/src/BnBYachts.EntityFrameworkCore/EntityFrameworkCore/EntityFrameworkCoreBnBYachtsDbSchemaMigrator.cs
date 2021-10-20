using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.EntityFrameworkCore
{
    public class EntityFrameworkCoreBnBYachtsDbSchemaMigrator
        : IBnBYachtsDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreBnBYachtsDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the BnBYachtsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<BnBYachtsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
