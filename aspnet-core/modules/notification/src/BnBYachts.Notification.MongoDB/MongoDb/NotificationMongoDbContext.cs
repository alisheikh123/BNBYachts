using BnBYachts.Notification.Entitiy;
using MongoDB.Driver;
using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace BnBYachts.Notification.MongoDB;

[ConnectionStringName("Default")]
public class NotificationMongoDbContext : AbpMongoDbContext
{
    public IMongoCollection<NotificationEntity> NotificationEntity => Collection<NotificationEntity>();
    protected override void CreateModel(IMongoModelBuilder modelBuilder)
    {
        base.CreateModel(modelBuilder);

        modelBuilder.Entity<NotificationEntity>(b =>
        {
            b.CollectionName = "NotificationEntity";
        });
    }
}
