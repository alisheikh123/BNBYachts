using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Boat.Data
{
    class BoatSeederService
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
            public void SeedLookups(CancellationToken token)
            {
                var path = Directory.GetCurrentDirectory();
                var features = new List<FeatureEntity>();
                using (StreamReader r = new StreamReader(path + "/Features.json"))
                {
                    string json = r.ReadToEnd();
                    features = JsonConvert.DeserializeObject<List<FeatureEntity>>(json);
                }
                _featureRepository.InsertManyAsync(features, true, token);
                //Seed Rules
                var rule = new List<RuleEntity>();
                using (StreamReader r = new StreamReader(path + "/Rules.json"))
                {
                    string json = r.ReadToEnd();
                    rule = JsonConvert.DeserializeObject<List<RuleEntity>>(json);
                }
                _ruleRepository.InsertManyAsync(rule, true, token);
            }

            public void SeedBoats(CancellationToken token)
            {
                var path = Directory.GetCurrentDirectory();
                var boats = new List<BoatEntity>();
                using (StreamReader r = new StreamReader(path + "/boats.json"))
                {
                    string json = r.ReadToEnd();
                    boats = JsonConvert.DeserializeObject<List<BoatEntity>>(json);
                }
                _boatRepository.InsertManyAsync(boats, true, token);
                //Seed Gallery
                var boatsGallery = new List<BoatGalleryEntity>();
                using (StreamReader r = new StreamReader(path + "/BoatsGallery.json"))
                {
                    string json = r.ReadToEnd();
                    boatsGallery = JsonConvert.DeserializeObject<List<BoatGalleryEntity>>(json);
                }
                _boatGalleryRepository.InsertManyAsync(boatsGallery, true, token);

                //Seed Boats Features
                var boatsFeature = new List<BoatFeatureEntity>();
                using (StreamReader r = new StreamReader(path + "/BoatFeatures.json"))
                {
                    string json = r.ReadToEnd();
                    boatsFeature = JsonConvert.DeserializeObject<List<BoatFeatureEntity>>(json);
                }
                _boatFeatureRepository.InsertManyAsync(boatsFeature, true, token);
                //Seed Boat Rules
                var boatsRules = new List<BoatRuleEntity>();
                using (StreamReader r = new StreamReader(path + "/BoatRule.json"))
                {
                    string json = r.ReadToEnd();
                    boatsRules = JsonConvert.DeserializeObject<List<BoatRuleEntity>>(json);
                }
                _boatRuleRepository.InsertManyAsync(boatsRules, true, token);
            }

        }
    }