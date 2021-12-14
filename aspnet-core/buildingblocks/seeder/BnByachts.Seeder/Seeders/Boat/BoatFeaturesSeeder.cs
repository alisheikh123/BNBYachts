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
    public class BoatFeaturesSeederService : BaseSeeder
    {
        public async Task MigrateAsync()
        {
            await SeedBoatsFeature().ConfigureAwait(false);
        }
        public async Task SeedBoatsFeature(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatFeaturesContract hostBoatFeature)
            {
                await EventBusDispatcher.Publish<IHostBoatFeaturesContract>(hostBoatFeature, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatFeaturesContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatsFeatures.json", cancellationToken))
                ?.ForEach(Action);
        }
        


    }
}
