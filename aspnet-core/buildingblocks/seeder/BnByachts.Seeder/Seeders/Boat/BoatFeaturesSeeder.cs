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
    public class BoatFeaturesSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        //private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        private static string GetFullPath => Path.Combine("D:\\BNBYechet\\aspnet-core\\buildingblocks\\Seeder\\BnByachts.Seeder\\Data\\");

        public BoatFeaturesSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
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
