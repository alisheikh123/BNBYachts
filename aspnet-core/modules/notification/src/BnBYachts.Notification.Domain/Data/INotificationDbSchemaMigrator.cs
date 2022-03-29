using System.Threading.Tasks;

namespace BnBYachts.Notification.Data;

public interface INotificationDbSchemaMigrator
{
    Task MigrateAsync();
}
