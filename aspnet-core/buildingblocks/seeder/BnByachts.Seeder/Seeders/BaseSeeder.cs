using BnBYachts.EventBusShared;
using System.IO;
using System.Reflection;
using Volo.Abp.DependencyInjection;

namespace BnByachts.Seeder.Seeders
{
    public abstract  class BaseSeeder:ITransientDependency
    {
        public BaseSeeder(EventBusDispatcher eventBusDispatcher)
        {
            EventBusDispatcher = eventBusDispatcher;
        }
        protected EventBusDispatcher EventBusDispatcher { get; set; }
        protected static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? string.Empty, @"Data/");
    }
}
