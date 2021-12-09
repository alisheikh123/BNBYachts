using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnBYachts.Chat
{
    [DependsOn(
        typeof(ChatDomainModule)
       
        )]
    public class ChatApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<ChatApplicationModule>();
            });
        }
    }
}
