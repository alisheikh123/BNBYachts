using System.Threading.Tasks;

namespace BnBYachts.Data
{
    public interface IBnBYachtsDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
