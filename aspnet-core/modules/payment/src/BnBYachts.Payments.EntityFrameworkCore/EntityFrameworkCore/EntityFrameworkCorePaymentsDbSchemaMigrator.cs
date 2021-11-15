using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Payments.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Payments.EntityFrameworkCore
{
    public class EntityFrameworkCorePaymentsDbSchemaMigrator
        : IPaymentsDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCorePaymentsDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the PaymentsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<PaymentsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
