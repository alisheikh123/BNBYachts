using BnBYachts.Chat.Chat;
using MongoDB.Driver;
using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace BnBYachts.Chat.MongoDB
{
    [ConnectionStringName("Default")]
    public class ChatMongoDbContext : AbpMongoDbContext
    {
        // Add mongo collections here.Example:
         public IMongoCollection<ChatEntity> ChatEntity => Collection<ChatEntity>();
         public IMongoCollection<UserInfo> UserInfo => Collection<UserInfo>();


        protected override void CreateModel(IMongoModelBuilder modelBuilder)
        {
            base.CreateModel(modelBuilder);

            //builder.Entity<YourEntity>(b =>
            //{
            //    //...
            //});
        }
    }
}
