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
    public class RulesSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");

        public RulesSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedRules().ConfigureAwait(false);
        }



        #region Seeder Rules
        public async Task SeedRules(CancellationToken cancellationToken = default)
        {
            async void Action(RuleContract rules)
            {
                await _eventBusDispatcher.Publish<IRuleContract>(rules, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<RuleContract>>(await File.ReadAllTextAsync($"{GetFullPath}Rules.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
