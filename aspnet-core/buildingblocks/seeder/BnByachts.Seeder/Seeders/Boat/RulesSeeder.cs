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
    public class RulesSeederService : BaseSeeder
    {
        private readonly BoatRulesSeederService _boatrulesSeeder;
        public RulesSeederService(BoatRulesSeederService boatrulesSeeder, EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
            _boatrulesSeeder = boatrulesSeeder;
        }

        public async Task MigrateAsync()
        {
            await SeedRules().ConfigureAwait(false);
        }
        public async Task SeedRules(CancellationToken cancellationToken = default)
        {
            async void Action(RuleContract rules)
            {
                await EventBusDispatcher.Publish<IRuleContract>(rules, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<RuleContract>>(await File.ReadAllTextAsync($"{GetFullPath}Rules.json", cancellationToken))
                ?.ForEach(Action);
            await Task.Delay(30000, cancellationToken);

            await _boatrulesSeeder.MigrateAsync();
        }



    }
}
