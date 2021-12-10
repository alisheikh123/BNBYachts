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
    public class BoatRulesSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data");
        public BoatRulesSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedBoatsRules().ConfigureAwait(false);
        }



        #region Seed Boat Rules
        public async Task SeedBoatsRules(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatRulesContract hostBoatRules)
            {
                await _eventBusDispatcher.Publish<IHostBoatRulesContract>(hostBoatRules, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatRulesContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatRules.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
