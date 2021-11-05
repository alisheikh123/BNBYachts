using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BnBYachts.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class BnBYachtsDbContextFactory : IDesignTimeDbContextFactory<BnBYachtsDbContext>
    {
        public BnBYachtsDbContext CreateDbContext(string[] args)
        {
            BnBYachtsEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<BnBYachtsDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new BnBYachtsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../BnBYachts.DbMigrator/"))
                 .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
