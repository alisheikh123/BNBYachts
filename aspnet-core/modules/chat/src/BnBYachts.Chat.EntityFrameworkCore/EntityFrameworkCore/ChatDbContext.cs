using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;


namespace BnBYachts.Chat.EntityFrameworkCore
{
    [ConnectionStringName("Default")]
    public class ChatDbContext : 
        AbpDbContext<ChatDbContext>
    {
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
