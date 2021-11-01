using System.Threading.Tasks;

namespace BnBYachts.Host.Data
{
    public interface IHostDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
