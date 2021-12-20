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
    public class BoatRulesSeederService : BaseSeeder
    {

        public BoatRulesSeederService(EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
        }
        public async Task MigrateAsync()
        {
            await SeedBoatsRules().ConfigureAwait(false);
        }
        public async Task SeedBoatsRules(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatRulesContract hostBoatRules)
            {
                await EventBusDispatcher.Publish<IHostBoatRulesContract>(hostBoatRules, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatRulesContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatRules.json", cancellationToken))
                ?.ForEach(Action);
        }



    }
}
