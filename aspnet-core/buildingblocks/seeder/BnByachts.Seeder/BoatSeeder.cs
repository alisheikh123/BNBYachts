using BnBYachts.Boat;
using Newtonsoft.Json;
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
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<BoatGalleryEntity, int> _boatGalleryRepository;
        private readonly IRepository<BoatFeatureEntity, int> _boatFeatureRepository;
        private readonly IRepository<BoatRuleEntity, int> _boatRuleRepository;
        private readonly IRepository<RuleEntity, int> _ruleRepository;
        private readonly IRepository<FeatureEntity, int> _featureRepository;
        public BoatSeederService(IRepository<FeatureEntity, int> featureRepository, IRepository<RuleEntity, int> ruleRepository, IRepository<BoatEntity, int> repository, IRepository<BoatGalleryEntity, int> boatGalleries, IRepository<BoatFeatureEntity, int> boatFeatureRepository, IRepository<BoatRuleEntity, int> boatRuleRepository)
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
            //await SeedLookups().ConfigureAwait(false);
            await SeedBoats().ConfigureAwait(false);
        }

        public async Task SeedLookups(CancellationToken token=default)
        {
            var path = Directory.GetCurrentDirectory();
            List<FeatureEntity> features;
            using (var r = new StreamReader(path + "/Features.json"))
            {
                var json = await r.ReadToEndAsync();
                features = JsonConvert.DeserializeObject<List<FeatureEntity>>(json);
            }
            await _featureRepository.InsertManyAsync(features, true, token);
            //Seed Rules
            List<RuleEntity> rule;
            using (var r = new StreamReader(path + "/Rules.json"))
            {
                var json = await r.ReadToEndAsync();
                rule = JsonConvert.DeserializeObject<List<RuleEntity>>(json);
            }
            await _ruleRepository.InsertManyAsync(rule, true, token);
        }

        public async Task SeedBoats(CancellationToken token=default)
        {
            var path = Directory.GetCurrentDirectory();
            List<BoatEntity> boats;
            using (var r = new StreamReader(path + "/boats.json"))
            {
                var json = await r.ReadToEndAsync();
                boats = JsonConvert.DeserializeObject<List<BoatEntity>>(json);
            }
            await _boatRepository.InsertManyAsync(boats, true, token);
            //Seed Gallery
            List<BoatGalleryEntity> boatsGallery;
            using (var r = new StreamReader(path + "/BoatsGallery.json"))
            {
                var json = await r.ReadToEndAsync();
                boatsGallery = JsonConvert.DeserializeObject<List<BoatGalleryEntity>>(json);
            }
            await _boatGalleryRepository.InsertManyAsync(boatsGallery, true, token);

            //Seed Boats Features
            List<BoatFeatureEntity> boatsFeature;
            using (var r = new StreamReader(path + "/BoatFeatures.json"))
            {
                var json = await r.ReadToEndAsync();
                boatsFeature = JsonConvert.DeserializeObject<List<BoatFeatureEntity>>(json);
            }
            await _boatFeatureRepository.InsertManyAsync(boatsFeature, true, token);
            //Seed Boat Rules
            List<BoatRuleEntity> boatsRules;
            using (var r = new StreamReader(path + "/BoatRule.json"))
            {
                var json = await r.ReadToEndAsync();
                boatsRules = JsonConvert.DeserializeObject<List<BoatRuleEntity>>(json);
            }
            //await _boatRepository.InsertManyAsync(boats, true, token);
            ////Seed Gallery
            //List<BoatGallery> boatsGallery;
            //using (var r = new StreamReader(path + "/BoatsGallery.json"))
            //{
            //    var json = await r.ReadToEndAsync();
            //    boatsGallery = JsonConvert.DeserializeObject<List<BoatGallery>>(json);
            //}
            //await _boatGalleryRepository.InsertManyAsync(boatsGallery, true, token);

            ////Seed Boats Features
            //List<BoatFeature> boatsFeature;
            //using (var r = new StreamReader(path + "/BoatFeatures.json"))
            //{
            //    var json = await r.ReadToEndAsync();
            //    boatsFeature = JsonConvert.DeserializeObject<List<BoatFeature>>(json);
            //}
            //await _boatFeatureRepository.InsertManyAsync(boatsFeature, true, token);
            ////Seed Boat Rules
            //List<BoatRule> boatsRules;
            //using (var r = new StreamReader(path + "/BoatRule.json"))
            //{
            //    var json = await r.ReadToEndAsync();
            //    boatsRules = JsonConvert.DeserializeObject<List<BoatRule>>(json);
            //}
            //await _boatRuleRepository.InsertManyAsync(boatsRules, true, token);
        }

    }
}
