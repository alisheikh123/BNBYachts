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
    public class UserSeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        //private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        private static string GetFullPath => Path.Combine("D:\\BNBYechet\\aspnet-core\\buildingblocks\\Seeder\\BnByachts.Seeder\\Data\\");

        public UserSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedUsers().ConfigureAwait(false);
        }


        #region User seeders
        public async Task SeedUsers(CancellationToken cancellationToken = default)
        {
            async void Action(UserContract user)
            {
                await _eventBusDispatcher.Publish<IUserContract>(user, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<UserContract>>(await File.ReadAllTextAsync($"{GetFullPath}Users.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
