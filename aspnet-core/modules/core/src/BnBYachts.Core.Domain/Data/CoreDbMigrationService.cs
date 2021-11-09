using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Newtonsoft.Json;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.TenantManagement;

namespace BnBYachts.Core.Data
{
    public class CoreDbMigrationService : ITransientDependency
    {
        public ILogger<CoreDbMigrationService> Logger { get; set; }

        private readonly IDataSeeder _dataSeeder;
        private readonly IEnumerable<ICoreDbSchemaMigrator> _dbSchemaMigrators;
        private readonly ITenantRepository _tenantRepository;
        private readonly ICurrentTenant _currentTenant;
        /// <summary>
        /// Boat Seeder
        private readonly IRepository<HostBoat, Guid> _boatRepository;
        private readonly IRepository<BoatGallery, Guid> _boatGalleryRepository;
        private readonly IRepository<BoatFeature, Guid> _boatFeatureRepository;
        private readonly IRepository<BoatRule, Guid> _boatRuleRepository;
        private readonly IRepository<Rule, Guid> _ruleRepository;
        private readonly IRepository<Feature, Guid> _featureRepository;
        /// </summary>
        /// <param name="dataSeeder"></param>
        /// <param name="dbSchemaMigrators"></param>
        /// <param name="tenantRepository"></param>
        /// <param name="currentTenant"></param>

        public CoreDbMigrationService(
            IDataSeeder dataSeeder,
            IEnumerable<ICoreDbSchemaMigrator> dbSchemaMigrators,
            ITenantRepository tenantRepository,
            ICurrentTenant currentTenant, IRepository<Feature, Guid> featureRepository, IRepository<Rule, Guid> ruleRepository, IRepository<HostBoat, Guid> repository, IRepository<BoatGallery, Guid> boatGalleries, IRepository<BoatFeature, Guid> boatFeatureRepository, IRepository<BoatRule, Guid> boatRuleRepository)
        {
            _dataSeeder = dataSeeder;
            _dbSchemaMigrators = dbSchemaMigrators;
            _tenantRepository = tenantRepository;
            _currentTenant = currentTenant;
            _boatRepository = repository;
            _boatGalleryRepository = boatGalleries;
            _boatFeatureRepository = boatFeatureRepository;
            _boatRuleRepository = boatRuleRepository;
            _ruleRepository = ruleRepository;
            _featureRepository = featureRepository;

            Logger = NullLogger<CoreDbMigrationService>.Instance;
        }

        public async Task MigrateAsync()
        {
            var initialMigrationAdded = AddInitialMigrationIfNotExist();

            if (initialMigrationAdded)
            {
                return;
            }

            Logger.LogInformation("Started database migrations...");

            await MigrateDatabaseSchemaAsync();
            await SeedDataAsync();
            ///Database Seed boat methods
            #region Boat Region
            await SeedLookups();
            await SeedBoats();
            #endregion
            Logger.LogInformation($"Successfully completed host database migrations.");

            var tenants = await _tenantRepository.GetListAsync(includeDetails: true);

            var migratedDatabaseSchemas = new HashSet<string>();
            foreach (var tenant in tenants)
            {
                using (_currentTenant.Change(tenant.Id))
                {
                    if (tenant.ConnectionStrings.Any())
                    {
                        var tenantConnectionStrings = tenant.ConnectionStrings
                            .Select(x => x.Value)
                            .ToList();

                        if (!migratedDatabaseSchemas.IsSupersetOf(tenantConnectionStrings))
                        {
                            await MigrateDatabaseSchemaAsync(tenant);

                            migratedDatabaseSchemas.AddIfNotContains(tenantConnectionStrings);
                        }
                    }

                    await SeedDataAsync(tenant);
                }

                Logger.LogInformation($"Successfully completed {tenant.Name} tenant database migrations.");
            }

            Logger.LogInformation("Successfully completed all database migrations.");
            Logger.LogInformation("You can safely end this process...");
        }

        private async Task MigrateDatabaseSchemaAsync(Tenant tenant = null)
        {
            Logger.LogInformation(
                $"Migrating schema for {(tenant == null ? "host" : tenant.Name + " tenant")} database...");

            foreach (var migrator in _dbSchemaMigrators)
            {
                await migrator.MigrateAsync();
            }
        }

        private async Task SeedDataAsync(Tenant tenant = null)
        {
            Logger.LogInformation($"Executing {(tenant == null ? "host" : tenant.Name + " tenant")} database seed...");

            await _dataSeeder.SeedAsync(new DataSeedContext(tenant?.Id)
                .WithProperty(IdentityDataSeedContributor.AdminEmailPropertyName, IdentityDataSeedContributor.AdminEmailDefaultValue)
                .WithProperty(IdentityDataSeedContributor.AdminPasswordPropertyName, IdentityDataSeedContributor.AdminPasswordDefaultValue)
            );
        }

        //Boat Seeder
        public async Task SeedLookups()
        {
            var path = Directory.GetCurrentDirectory();
            var features = new List<Feature>();
            using (StreamReader r = new StreamReader(path + "/Features.json"))
            {
                string json = r.ReadToEnd();
                features = JsonConvert.DeserializeObject<List<Feature>>(json);
            }
            await _featureRepository.InsertManyAsync(features, true);
            //Seed Rules
            var rule = new List<Rule>();
            using (StreamReader r = new StreamReader(path + "/Rules.json"))
            {
                string json = r.ReadToEnd();
                rule = JsonConvert.DeserializeObject<List<Rule>>(json);
            }
            await _ruleRepository.InsertManyAsync(rule, true);
        }

        public async Task SeedBoats()
        {
            var path = Directory.GetCurrentDirectory();
            var boats = new List<HostBoat>();
            using (StreamReader r = new StreamReader(path + "/boats.json"))
            {
                string json = r.ReadToEnd();
                boats = JsonConvert.DeserializeObject<List<HostBoat>>(json);
            }
            await _boatRepository.InsertManyAsync(boats, true);
            //Seed Gallery
            var boatsGallery = new List<BoatGallery>();
            using (StreamReader r = new StreamReader(path + "/BoatsGallery.json"))
            {
                string json = r.ReadToEnd();
                boatsGallery = JsonConvert.DeserializeObject<List<BoatGallery>>(json);
            }
            await _boatGalleryRepository.InsertManyAsync(boatsGallery, true);

            //Seed Boats Features
            var boatsFeature = new List<BoatFeature>();
            using (StreamReader r = new StreamReader(path + "/BoatFeatures.json"))
            {
                string json = r.ReadToEnd();
                boatsFeature = JsonConvert.DeserializeObject<List<BoatFeature>>(json);
            }
            await _boatFeatureRepository.InsertManyAsync(boatsFeature, true);
            //Seed Boat Rules
            var boatsRules = new List<BoatRule>();
            using (StreamReader r = new StreamReader(path + "/BoatRule.json"))
            {
                string json = r.ReadToEnd();
                boatsRules = JsonConvert.DeserializeObject<List<BoatRule>>(json);
            }
            await _boatRuleRepository.InsertManyAsync(boatsRules, true);
        }
        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <returns></returns>

        private bool AddInitialMigrationIfNotExist()
        {
            try
            {
                if (!DbMigrationsProjectExists())
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }

            try
            {
                if (!MigrationsFolderExists())
                {
                    AddInitialMigration();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                Logger.LogWarning("Couldn't determinate if any migrations exist : " + e.Message);
                return false;
            }
        }

        private bool DbMigrationsProjectExists()
        {
            var dbMigrationsProjectFolder = GetEntityFrameworkCoreProjectFolderPath();

            return dbMigrationsProjectFolder != null;
        }

        private bool MigrationsFolderExists()
        {
            var dbMigrationsProjectFolder = GetEntityFrameworkCoreProjectFolderPath();

            return Directory.Exists(Path.Combine(dbMigrationsProjectFolder, "Migrations"));
        }

        private void AddInitialMigration()
        {
            Logger.LogInformation("Creating initial migration...");

            string argumentPrefix;
            string fileName;

            if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX) || RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                argumentPrefix = "-c";
                fileName = "/bin/bash";
            }
            else
            {
                argumentPrefix = "/C";
                fileName = "cmd.exe";
            }

            var procStartInfo = new ProcessStartInfo(fileName,
                $"{argumentPrefix} \"abp create-migration-and-run-migrator \"{GetEntityFrameworkCoreProjectFolderPath()}\"\""
            );

            try
            {
                Process.Start(procStartInfo);
            }
            catch (Exception)
            {
                throw new Exception("Couldn't run ABP CLI...");
            }
        }

        private string GetEntityFrameworkCoreProjectFolderPath()
        {
            var slnDirectoryPath = GetSolutionDirectoryPath();

            if (slnDirectoryPath == null)
            {
                throw new Exception("Solution folder not found!");
            }

            var srcDirectoryPath = Path.Combine(slnDirectoryPath, "src");

            return Directory.GetDirectories(srcDirectoryPath)
                .FirstOrDefault(d => d.EndsWith(".EntityFrameworkCore"));
        }

        private string GetSolutionDirectoryPath()
        {
            var currentDirectory = new DirectoryInfo(Directory.GetCurrentDirectory());

            while (Directory.GetParent(currentDirectory.FullName) != null)
            {
                currentDirectory = Directory.GetParent(currentDirectory.FullName);

                if (Directory.GetFiles(currentDirectory.FullName).FirstOrDefault(f => f.EndsWith(".sln")) != null)
                {
                    return currentDirectory.FullName;
                }
            }

            return null;
        }
    }
}
