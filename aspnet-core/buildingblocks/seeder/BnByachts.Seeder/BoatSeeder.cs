using System;
using BnBYachts.Boat;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.Boat.Enum;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace BnByachts.Seeder
{
    public class BoatSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        public BoatSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            //await SeedLookups().ConfigureAwait(false);
            await SeedBoats().ConfigureAwait(false);
        }
        public async Task SeedBoats(CancellationToken token=default)
        {

            
         _eventBusDispatcher.Publish<IHostBoatContract>(new HostBoatContract
         {
             Name = "my Boat",
             Length = 200,
             TotalBedrooms = 2,
             TotalWashrooms = 3,
             IsBoatelServicesOffered = true,
             BoatelAvailabilityDays = 20,
             CheckinTime = new DateTime(),
             CheckoutTime = new DateTime().AddDays(3),
             Latitude = 32.073978,
             Longitude = 72.686073,
             PerDayCharges = 200,
             IsActive = true,
             BoatType = 1
         });
         await Task.CompletedTask;
        }
    }
}
