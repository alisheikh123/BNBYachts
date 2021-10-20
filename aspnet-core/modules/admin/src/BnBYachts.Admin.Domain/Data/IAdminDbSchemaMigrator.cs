using System.Threading.Tasks;

namespace BnBYachts.Admin.Data
{
    public interface IAdminDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
