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
    public class RolesSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        public RolesSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedRoles().ConfigureAwait(false);
        }
        public async Task SeedRoles(CancellationToken cancellationToken = default)
        {
            async void Action(RolesContract role)
            {
                await _eventBusDispatcher.Publish<IRolesContract>(role, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<RolesContract>>(await File.ReadAllTextAsync($"{GetFullPath}Roles.json", cancellationToken))
                ?.ForEach(Action);
        }



    }
}
