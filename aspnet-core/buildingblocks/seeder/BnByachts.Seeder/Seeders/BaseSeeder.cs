using BnBYachts.EventBusShared;
using System.IO;
using System.Reflection;
using Volo.Abp.DependencyInjection;


namespace BnByachts.Seeder.Seeders
{
    public abstract class BaseSeeder
    {
        public IAbpLazyServiceProvider LazyServiceProvider { get; set; }
        protected EventBusDispatcher EventBusDispatcher => LazyServiceProvider.LazyGetRequiredService<EventBusDispatcher>();
        protected static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? string.Empty, @"Data/");
    }
}
