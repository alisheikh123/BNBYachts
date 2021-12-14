using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.Seeder.Seeders;

namespace BnByachts.Seeder
{
    public class BoatSeederService : BaseSeeder
    {
        private readonly BoatCalendarSeederService _boatCalenderSeederService;
        public BoatSeederService(BoatCalendarSeederService boatCalenderSeederService, EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
            _boatCalenderSeederService = boatCalenderSeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedBoats().ConfigureAwait(false);
        }

    
        public async Task SeedBoats(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatContract hostBoat)
            {
                await EventBusDispatcher.Publish<IHostBoatContract>(hostBoat, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatContract>>(await File.ReadAllTextAsync($"{GetFullPath}Boat.json", cancellationToken))
                ?.ForEach(Action);
            await Task.Delay(30000, cancellationToken);

            await _boatCalenderSeederService.MigrateAsync();
        }

    }
}
