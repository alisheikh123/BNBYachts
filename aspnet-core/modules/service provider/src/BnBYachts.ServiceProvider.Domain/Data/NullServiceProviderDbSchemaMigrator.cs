using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.ServiceProvider.Data
{
    /* This is used if database provider does't define
     * IServiceProviderDbSchemaMigrator implementation.
     */
    public class NullServiceProviderDbSchemaMigrator : IServiceProviderDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}