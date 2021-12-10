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
    public class BoatSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        public BoatSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedBoats().ConfigureAwait(false);
        }

        #region Seed Boats
        public async Task SeedBoats(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatContract hostBoat)
            {
                await _eventBusDispatcher.Publish<IHostBoatContract>(hostBoat, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatContract>>(await File.ReadAllTextAsync($"{GetFullPath}Boat.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion

    }
}
