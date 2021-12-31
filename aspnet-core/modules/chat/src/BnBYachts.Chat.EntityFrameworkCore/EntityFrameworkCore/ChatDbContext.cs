using BnBYachts.Chat.Chat;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;


namespace BnBYachts.Chat.EntityFrameworkCore
{
    [ConnectionStringName("Default")]
    public class ChatDbContext : 
        AbpDbContext<ChatDbContext>
    {
        #region Entities from the modules
        public DbSet<ChatEntity> Chats{ get; set; }
        public DbSet<ChatRoom> ChatRooms{ get; set; }
        public DbSet<UserInfo> UserDetails{ get; set; }
        public DbSet<BlockedUsersEntity> BlockedUsers { get; set; }
        public DbSet<ArchivedChatsEntity> ArchivedChats { get; set; }
        #endregion
        public ChatDbContext(DbContextOptions<ChatDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
