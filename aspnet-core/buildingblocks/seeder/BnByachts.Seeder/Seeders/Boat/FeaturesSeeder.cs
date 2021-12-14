using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.DependencyInjection;
using BnByachts.Seeder.Seeders;

namespace BnByachts.Seeder
{
    public class FeatureSeederService : BaseSeeder
    {
        private readonly BoatFeaturesSeederService _boatFeaturesSeederService;
        public FeatureSeederService(BoatFeaturesSeederService boatFeaturesSeederService)
        {
            _boatFeaturesSeederService = boatFeaturesSeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedFeatures().ConfigureAwait(false);
        }

        public async Task SeedFeatures(CancellationToken cancellationToken = default)
        {
            async void Action(FeatureContract feature)
            {
                await EventBusDispatcher.Publish<IFeatureContract>(feature, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<FeatureContract>>(await File.ReadAllTextAsync($"{GetFullPath}Features.json", cancellationToken))
                ?.ForEach(Action);

            await Task.Delay(20000, cancellationToken);

           await _boatFeaturesSeederService.MigrateAsync();
        }



    }
}
