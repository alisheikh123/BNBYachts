
using BnBYachts.Chat.Hubs;
using Microsoft.Extensions.DependencyInjection;
using System;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace BnBYachts.Chat
{
    [DependsOn(
      typeof(AbpAutoMapperModule),
    typeof(AbpAspNetCoreSignalRModule)
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
