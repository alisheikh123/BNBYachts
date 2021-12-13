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
    public class EventSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

         private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        public EventSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedEvents().ConfigureAwait(false);
        }



        #region Seeder Events
        public async Task SeedEvents(CancellationToken cancellationToken = default)
        {
            async void Action(EventsContract events)
            {
                await _eventBusDispatcher.Publish<IEventsContract>(events, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<EventsContract>>(await File.ReadAllTextAsync($"{GetFullPath}Event.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
