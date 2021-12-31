
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnBYachts.Chat
{
    [DependsOn(
      typeof(AbpAutoMapperModule)
  )]
    public class ChatDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAutoMapperObjectMapper<ChatDomainModule>();
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<ChatDomainModule>(validate: false);
            });

        }
    }
}
