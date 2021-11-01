﻿using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BnBYachts.Captain.Data;
using Volo.Abp.DependencyInjection;

namespace BnBYachts.Captain.EntityFrameworkCore
{
    public class EntityFrameworkCoreCaptainDbSchemaMigrator
        : ICaptainDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreCaptainDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the CaptainDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<CaptainDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
