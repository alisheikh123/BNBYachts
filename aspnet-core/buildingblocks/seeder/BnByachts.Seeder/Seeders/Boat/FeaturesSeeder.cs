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
    public class FeatureSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly BoatFeaturesSeederService _boatFeaturesSeederService;

         private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");

        public FeatureSeederService(EventBusDispatcher eventBusDispatcher, BoatFeaturesSeederService boatFeaturesSeederService)
        {
            _eventBusDispatcher = eventBusDispatcher;
            _boatFeaturesSeederService = boatFeaturesSeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedFeatures().ConfigureAwait(false);
        }


        #region Seeder Feature
        public async Task SeedFeatures(CancellationToken cancellationToken = default)
        {
            async void Action(FeatureContract feature)
            {
                await _eventBusDispatcher.Publish<IFeatureContract>(feature, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<FeatureContract>>(await File.ReadAllTextAsync($"{GetFullPath}Features.json", cancellationToken))
                ?.ForEach(Action);

            await Task.Delay(20000, cancellationToken);

           await _boatFeaturesSeederService.MigrateAsync();
        }
        #endregion



    }
}
