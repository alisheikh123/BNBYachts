using System.Threading.Tasks;

namespace BnBYachts.Boat.Data
{
    public interface IBoatDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
