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
    public class BoatCalendarSeederService : BaseSeeder
    {
        private readonly BoatGallerySeederService _boatGallerySeederService;
        public BoatCalendarSeederService( BoatGallerySeederService boatGallerySeederService)
        {
            _boatGallerySeederService = boatGallerySeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedBoatsCalendar().ConfigureAwait(false);
        }
        public async Task SeedBoatsCalendar(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatCalendarContract hostBoatCalendar)
            {
                await EventBusDispatcher.Publish<IHostBoatCalendarContract>(hostBoatCalendar, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatCalendarContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatsCalendar.json", cancellationToken))
                ?.ForEach(Action);
            await Task.Delay(10000, cancellationToken);

            await _boatGallerySeederService.MigrateAsync();
        }
       

    

    }
}
