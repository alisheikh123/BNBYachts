using System.Threading.Tasks;

namespace BnBYachts.ServiceProvider.Data
{
    public interface IServiceProviderDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
