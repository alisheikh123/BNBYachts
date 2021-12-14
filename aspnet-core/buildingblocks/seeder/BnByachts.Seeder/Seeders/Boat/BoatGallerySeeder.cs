using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.DependencyInjection;

namespace BnByachts.Seeder
{
    public class BoatGallerySeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly CharterSeederService _charterSeederService;
        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        public BoatGallerySeederService(EventBusDispatcher eventBusDispatcher, CharterSeederService charterSeederService)
        {
            _eventBusDispatcher = eventBusDispatcher;
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
                await _eventBusDispatcher.Publish<IHostBoatGalleryContract>(hostBoatGallery, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatGalleryContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatGallery.json", cancellationToken))
                ?.ForEach(Action);

            await Task.Delay(10000, cancellationToken);

            await _charterSeederService.MigrateAsync();
        }



    }
}
