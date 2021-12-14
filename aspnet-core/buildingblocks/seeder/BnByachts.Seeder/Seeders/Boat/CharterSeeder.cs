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
    public class CharterSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly EventSeederService _eventSeederService;

         private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");

        public CharterSeederService(EventBusDispatcher eventBusDispatcher, EventSeederService eventSeederService)
        {
            _eventBusDispatcher = eventBusDispatcher;
            _eventSeederService = eventSeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedCharter().ConfigureAwait(false);
        }
        public async Task SeedCharter(CancellationToken cancellationToken = default)
        {
            async void Action(ChartersContract chaters)
            {
                await _eventBusDispatcher.Publish<IChartersContract>(chaters, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<ChartersContract>>(await File.ReadAllTextAsync($"{GetFullPath}Charter.json", cancellationToken))
                ?.ForEach(Action);
            await Task.Delay(10000, cancellationToken);

            await _eventSeederService.MigrateAsync();
        }
     



    }
}
