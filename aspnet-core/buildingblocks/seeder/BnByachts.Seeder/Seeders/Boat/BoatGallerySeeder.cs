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
    public class BoatGallerySeederService : BaseSeeder
    {
        private readonly CharterSeederService _charterSeederService;
        public BoatGallerySeederService(CharterSeederService charterSeederService, EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
            _charterSeederService = charterSeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedBoatsGallery().ConfigureAwait(false);
        }
        public async Task SeedBoatsGallery(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatGalleryContract hostBoatGallery)
            {
                await EventBusDispatcher.Publish<IHostBoatGalleryContract>(hostBoatGallery, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatGalleryContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatGallery.json", cancellationToken))
                ?.ForEach(Action);

            await Task.Delay(10000, cancellationToken);

            await _charterSeederService.MigrateAsync();
        }



    }
}
