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
    public class BoatGallerySeederService : ITransientDependency
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        //private static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Data/");
        private static string GetFullPath => Path.Combine("D:\\BNBYechet\\aspnet-core\\buildingblocks\\Seeder\\BnByachts.Seeder\\Data\\");
        public BoatGallerySeederService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task MigrateAsync()
        {
            await SeedBoatsGallery().ConfigureAwait(false);
        }


        #region Seed Boat Gallery
        public async Task SeedBoatsGallery(CancellationToken cancellationToken = default)
        {
            async void Action(HostBoatGalleryContract hostBoatGallery)
            {
                await _eventBusDispatcher.Publish<IHostBoatGalleryContract>(hostBoatGallery, cancellationToken);
            }

            JsonConvert.DeserializeObject<List<HostBoatGalleryContract>>(await File.ReadAllTextAsync($"{GetFullPath}BoatGallery.json", cancellationToken))
                ?.ForEach(Action);
        }
        #endregion



    }
}
