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
    public class UserRolesSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        public UserRolesSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedUserRoles().ConfigureAwait(false);
        }


        #region UserRoles
        public async Task SeedUserRoles(CancellationToken cancellationToken = default)
        {
            async void Action(UserRolesContract userRoles)
            {
                await _eventBusDispatcher.Publish<IUserRolesContract>(userRoles, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<UserRolesContract>>(await File.ReadAllTextAsync($"{GetFullPath}UserRoles.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
