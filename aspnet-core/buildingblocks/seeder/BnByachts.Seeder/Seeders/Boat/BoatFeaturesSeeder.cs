using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.Seeder.Seeders;
using Volo.Abp.DependencyInjection;

namespace BnByachts.Seeder
{
    public class BoatFeaturesSeederService : BaseSeeder,ITransientDependency
    {
        public BoatFeaturesSeederService(EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
        }

        public async Task MigrateAsync()
        {
            await SeedBoatsFeature().ConfigureAwait(false);
        }



        #region Seeder Boat feature
        public async Task SeedBoatsFeature(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatFeaturesContract hostBoatFeature)
            {
                await _eventBusDispatcher.Publish<IHostBoatFeaturesContract>(hostBoatFeature, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatFeaturesContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatsFeatures.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion


    }
}
