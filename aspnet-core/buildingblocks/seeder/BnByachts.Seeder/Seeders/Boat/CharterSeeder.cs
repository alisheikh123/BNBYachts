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
    public class CharterSeederService : BaseSeeder
    {
        private readonly EventSeederService _eventSeederService;

        public CharterSeederService(EventSeederService eventSeederService, EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
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
                await EventBusDispatcher.Publish<IChartersContract>(chaters, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<ChartersContract>>(await File.ReadAllTextAsync($"{GetFullPath}Charter.json", cancellationToken))
                ?.ForEach(Action);
            await Task.Delay(10000, cancellationToken);

            await _eventSeederService.MigrateAsync();
        }
     



    }
}
