using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Data
{
    /* This is used if database provider does't define
     * IBnBYachtsDbSchemaMigrator implementation.
     */
    public class NullBnBYachtsDbSchemaMigrator : IBnBYachtsDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}