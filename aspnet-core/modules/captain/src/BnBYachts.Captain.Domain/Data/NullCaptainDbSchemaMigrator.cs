using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Captain.Data
{
    /* This is used if database provider does't define
     * ICaptainDbSchemaMigrator implementation.
     */
    public class NullCaptainDbSchemaMigrator : ICaptainDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}