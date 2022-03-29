using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Notification.Data;

/* This is used if database provider does't define
 * INotificationDbSchemaMigrator implementation.
 */
public class NullNotificationDbSchemaMigrator : INotificationDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
