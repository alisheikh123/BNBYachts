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

        //private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        private static string GetFullPath => Path.Combine("D:\\BNBYechet\\aspnet-core\\buildingblocks\\Seeder\\BnByachts.Seeder\\Data\\");

        public CharterSeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedCharter().ConfigureAwait(false);
        }



        #region Seeder Charters
        public async Task SeedCharter(CancellationToken cancellationToken = default)
        {
            async void Action(ChartersContract chaters)
            {
                await _eventBusDispatcher.Publish<IChartersContract>(chaters, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<ChartersContract>>(await File.ReadAllTextAsync($"{GetFullPath}Charter.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
