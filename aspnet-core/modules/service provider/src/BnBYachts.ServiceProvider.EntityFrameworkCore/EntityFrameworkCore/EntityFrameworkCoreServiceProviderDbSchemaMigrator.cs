using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.ServiceProvider.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.ServiceProvider.EntityFrameworkCore
{
    public class EntityFrameworkCoreServiceProviderDbSchemaMigrator
        : IServiceProviderDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreServiceProviderDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the ServiceProviderDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<ServiceProviderDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
