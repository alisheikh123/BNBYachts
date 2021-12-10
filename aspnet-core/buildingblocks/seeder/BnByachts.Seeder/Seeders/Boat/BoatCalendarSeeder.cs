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
    public class BoatCalendarSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");

        public BoatCalendarSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedBoatsCalendar().ConfigureAwait(false);
        }
        
     

        #region Seed Boat Calendar
        public async Task SeedBoatsCalendar(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatCalendarContract hostBoatCalendar)
            {
                await _eventBusDispatcher.Publish<IHostBoatCalendarContract>(hostBoatCalendar, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatCalendarContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatsCalendar.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion

    

    }
}
