using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Boat.Data
{
    /* This is used if database provider does't define
     * IBoatDbSchemaMigrator implementation.
     */
    public class NullBoatDbSchemaMigrator : IBoatDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}