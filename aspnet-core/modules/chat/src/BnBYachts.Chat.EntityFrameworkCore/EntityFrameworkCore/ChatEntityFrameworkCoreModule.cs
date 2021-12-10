using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.SqlServer;
using Volo.Abp.Modularity;

namespace BnBYachts.Chat.EntityFrameworkCore
{
    [DependsOn(
        typeof(ChatDomainModule),
        typeof(AbpEntityFrameworkCoreSqlServerModule)
        )]
    public class ChatEntityFrameworkCoreModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<ChatDbContext>(options =>
            {
                options.AddDefaultRepositories(includeAllEntities: true);
            });


            Configure<AbpDbContextOptions>(options =>
            {
                options.UseSqlServer();
            });
        }
    }
}
