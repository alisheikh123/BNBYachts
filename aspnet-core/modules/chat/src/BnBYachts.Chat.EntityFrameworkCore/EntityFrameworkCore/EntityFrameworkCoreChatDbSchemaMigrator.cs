using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Chat.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Chat.EntityFrameworkCore
{
    public class EntityFrameworkCoreChatDbSchemaMigrator
        : IChatDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreChatDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            await _serviceProvider
                .GetRequiredService<ChatDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
