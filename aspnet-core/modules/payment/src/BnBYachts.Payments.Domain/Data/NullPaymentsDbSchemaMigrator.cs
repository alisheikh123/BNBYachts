using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Payments.Data
{
    /* This is used if database provider does't define
     * IPaymentsDbSchemaMigrator implementation.
     */
    public class NullPaymentsDbSchemaMigrator : IPaymentsDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}