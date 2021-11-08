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
            public void SeedLookups(CancellationToken token)
            {
                var path = Directory.GetCurrentDirectory();
                var features = new List<Feature>();
                using (StreamReader r = new StreamReader(path + "/Features.json"))
                {
                    string json = r.ReadToEnd();
                    features = JsonConvert.DeserializeObject<List<Feature>>(json);
                }
                _featureRepository.InsertManyAsync(features, true, token);
                //Seed Rules
                var rule = new List<Rule>();
                using (StreamReader r = new StreamReader(path + "/Rules.json"))
                {
                    string json = r.ReadToEnd();
                    rule = JsonConvert.DeserializeObject<List<Rule>>(json);
                }
                _ruleRepository.InsertManyAsync(rule, true, token);
            }

            public void SeedBoats(CancellationToken token)
            {
                var path = Directory.GetCurrentDirectory();
                var boats = new List<HostBoat>();
                using (StreamReader r = new StreamReader(path + "/boats.json"))
                {
                    string json = r.ReadToEnd();
                    boats = JsonConvert.DeserializeObject<List<HostBoat>>(json);
                }
                _boatRepository.InsertManyAsync(boats, true, token);
                //Seed Gallery
                var boatsGallery = new List<BoatGallery>();
                using (StreamReader r = new StreamReader(path + "/BoatsGallery.json"))
                {
                    string json = r.ReadToEnd();
                    boatsGallery = JsonConvert.DeserializeObject<List<BoatGallery>>(json);
                }
                _boatGalleryRepository.InsertManyAsync(boatsGallery, true, token);

                //Seed Boats Features
                var boatsFeature = new List<BoatFeature>();
                using (StreamReader r = new StreamReader(path + "/BoatFeatures.json"))
                {
                    string json = r.ReadToEnd();
                    boatsFeature = JsonConvert.DeserializeObject<List<BoatFeature>>(json);
                }
                _boatFeatureRepository.InsertManyAsync(boatsFeature, true, token);
                //Seed Boat Rules
                var boatsRules = new List<BoatRule>();
                using (StreamReader r = new StreamReader(path + "/BoatRule.json"))
                {
                    string json = r.ReadToEnd();
                    boatsRules = JsonConvert.DeserializeObject<List<BoatRule>>(json);
                }
                _boatRuleRepository.InsertManyAsync(boatsRules, true, token);
            }

        }
    }