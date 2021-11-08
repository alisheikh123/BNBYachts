using System.Threading.Tasks;

namespace BnBYachts.Core.Data
{
    public interface ICoreDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
