using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BnBYachts.ServiceProvider.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class ServiceProviderDbContextFactory : IDesignTimeDbContextFactory<ServiceProviderDbContext>
    {
        public ServiceProviderDbContext CreateDbContext(string[] args)
        {
            ServiceProviderEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<ServiceProviderDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new ServiceProviderDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../BnBYachts.ServiceProvider.DbMigrator/"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
