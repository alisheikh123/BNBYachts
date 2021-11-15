using BnBYachts.Boat;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace BnByachts.Seeder
{
    public class BoatSeederService : ITransientDependency
    {
        private readonly IRepository<HostBoat, Guid> _boatRepository;
        private readonly IRepository<BoatGallery, Guid> _boatGalleryRepository;
        private readonly IRepository<BoatFeature, Guid> _boatFeatureRepository;
        private readonly IRepository<BoatRule, Guid> _boatRuleRepository;
        private readonly IRepository<Rule, Guid> _ruleRepository;
        private readonly IRepository<Feature, Guid> _featureRepository;
        public BoatSeederService(IRepository<Feature, Guid> featureRepository, IRepository<Rule, Guid> ruleRepository, IRepository<HostBoat, Guid> repository, IRepository<BoatGallery, Guid> boatGalleries, IRepository<BoatFeature, Guid> boatFeatureRepository, IRepository<BoatRule, Guid> boatRuleRepository)
        {
            _boatRepository = repository;
            _boatGalleryRepository = boatGalleries;
            _boatFeatureRepository = boatFeatureRepository;
            _boatRuleRepository = boatRuleRepository;
            _ruleRepository = ruleRepository;
            _featureRepository = featureRepository;

        }



        public async Task MigrateAsync()
        {
            await SeedLookups().ConfigureAwait(false);
            await SeedBoats().ConfigureAwait(false);
        }

        public async Task SeedLookups(CancellationToken token=default)
        {
            var path = Directory.GetCurrentDirectory();
            List<Feature> features;
            using (var r = new StreamReader(path + "/Features.json"))
            {
                var json = await r.ReadToEndAsync();
                features = JsonConvert.DeserializeObject<List<Feature>>(json);
            }
            await _featureRepository.InsertManyAsync(features, true, token);
            //Seed Rules
            List<Rule> rule;
            using (var r = new StreamReader(path + "/Rules.json"))
            {
                var json = await r.ReadToEndAsync();
                rule = JsonConvert.DeserializeObject<List<Rule>>(json);
            }
            await _ruleRepository.InsertManyAsync(rule, true, token);
        }

        public async Task SeedBoats(CancellationToken token=default)
        {
            var path = Directory.GetCurrentDirectory();
            List<HostBoat> boats;
            using (var r = new StreamReader(path + "/boats.json"))
            {
                var json = await r.ReadToEndAsync();
                boats = JsonConvert.DeserializeObject<List<HostBoat>>(json);
            }
            await _boatRepository.InsertManyAsync(boats, true, token);
            //Seed Gallery
            List<BoatGallery> boatsGallery;
            using (var r = new StreamReader(path + "/BoatsGallery.json"))
            {
                var json = await r.ReadToEndAsync();
                boatsGallery = JsonConvert.DeserializeObject<List<BoatGallery>>(json);
            }
            await _boatGalleryRepository.InsertManyAsync(boatsGallery, true, token);

            //Seed Boats Features
            List<BoatFeature> boatsFeature;
            using (var r = new StreamReader(path + "/BoatFeatures.json"))
            {
                var json = await r.ReadToEndAsync();
                boatsFeature = JsonConvert.DeserializeObject<List<BoatFeature>>(json);
            }
            await _boatFeatureRepository.InsertManyAsync(boatsFeature, true, token);
            //Seed Boat Rules
            List<BoatRule> boatsRules;
            using (var r = new StreamReader(path + "/BoatRule.json"))
            {
                var json = await r.ReadToEndAsync();
                boatsRules = JsonConvert.DeserializeObject<List<BoatRule>>(json);
            }
            await _boatRuleRepository.InsertManyAsync(boatsRules, true, token);
        }

    }
}
