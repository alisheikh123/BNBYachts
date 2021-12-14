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
        private readonly BoatCalendarSeederService _boatCalenderSeederService;
        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        public BoatSeederService(EventBusDispatcher eventBusDispatcher, BoatCalendarSeederService boatCalenderSeederService)
        {
            _eventBusDispatcher = eventBusDispatcher;
            _boatCalenderSeederService = boatCalenderSeederService;
        }

        public async Task MigrateAsync()
        {
            await SeedBoats().ConfigureAwait(false);
        }

    
        public async Task SeedBoats(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatContract hostBoat)
            {
                await _eventBusDispatcher.Publish<IHostBoatContract>(hostBoat, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatContract>>(await File.ReadAllTextAsync($"{GetFullPath}Boat.json", cancellationToken))
                ?.ForEach(Action);
            await Task.Delay(30000, cancellationToken);

            await _boatCalenderSeederService.MigrateAsync();
        }

    }
}
