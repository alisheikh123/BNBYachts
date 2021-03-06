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
    public class EventSeederService : BaseSeeder
    {
        public EventSeederService(EventBusDispatcher eventBusDispatcher) : base(eventBusDispatcher)
        {
        }
        public async Task MigrateAsync()
        {
            await SeedEvents().ConfigureAwait(false);
        }
        public async Task SeedEvents(CancellationToken cancellationToken = default)
        {
            async void Action(EventsContract events)
            {
                await EventBusDispatcher.Publish<IEventsContract>(events, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<EventsContract>>(await File.ReadAllTextAsync($"{GetFullPath}Event.json", cancellationToken))
                ?.ForEach(Action);
        }



    }
}
