using BnBYachts.EventBusShared;
using System.IO;
using System.Reflection;


namespace BnByachts.Seeder.Seeders
{
    public abstract class BaseSeeder
    {
        protected readonly EventBusDispatcher _eventBusDispatcher;

        protected static string GetFullPath => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? string.Empty, @"Data/");

        protected BaseSeeder(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }
    }
}
