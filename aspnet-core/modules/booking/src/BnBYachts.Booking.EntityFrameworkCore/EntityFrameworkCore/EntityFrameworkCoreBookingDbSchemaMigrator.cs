using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Booking.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Booking.EntityFrameworkCore
{
    public class EntityFrameworkCoreBookingDbSchemaMigrator
        : IBookingDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreBookingDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the BookingDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<BookingDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
