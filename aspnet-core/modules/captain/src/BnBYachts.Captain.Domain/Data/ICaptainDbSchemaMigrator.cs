using System.Threading.Tasks;

namespace BnBYachts.Captain.Data
{
    public interface ICaptainDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
