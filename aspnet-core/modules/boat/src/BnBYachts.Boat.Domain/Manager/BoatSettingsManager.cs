using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager
{
    public class BoatSettingsManager : DomainService, IBoatSettingsManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<BoatFeatureEntity, int> _boatelFeatureRepo;
        private readonly IRepository<BoatRuleEntity, int> _boatelRulesRepo;
        private readonly IRepository<BoatCalendarEntity, int> _boatelCalendarRepo;
        private readonly IRepository<BoatGalleryEntity, int> _boatGalleryRepo;
        private readonly IRepository<FeatureEntity, int> _featuresRepo;
        private readonly IRepository<RuleEntity, int> _rulesRepo;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;

        public BoatSettingsManager(IRepository<BoatEntity, int> boatRepository, IRepository<BoatFeatureEntity, int> boatelFeatureRepo, IRepository<BoatRuleEntity, int> boatelRulesRepo,
            IRepository<BoatCalendarEntity, int> boatelCalendarRepo, IRepository<BoatGalleryEntity, int> boatGalleryRepo, IObjectMapper<BoatDomainModule> objectMapper, IRepository<FeatureEntity, int> featureRepo,
            IRepository<RuleEntity, int> rulesRepo)
        {
            _boatRepository = boatRepository;
            _boatelFeatureRepo = boatelFeatureRepo;
            _boatelRulesRepo = boatelRulesRepo;
            _boatelCalendarRepo = boatelCalendarRepo;
            _boatGalleryRepo = boatGalleryRepo;
            _rulesRepo = rulesRepo;
            _featuresRepo = featureRepo;
            _objectMapper = objectMapper;
        }

        public async Task<bool> UpdateBoat(HostBoatRequestable boatDetails, Guid? userId)
        {
            var boatEntity = await _boatRepository.FindAsync(res => res.Id == boatDetails.Id);
            _objectMapper.Map<HostBoatRequestable, BoatEntity>(boatDetails, boatEntity);
            boatEntity.BoatCalendars = null;
            boatEntity.BoatFeatures = null;
            boatEntity.BoatRules = null;
            boatEntity.BoatLocations = null;
            boatEntity.BoatGalleries = null;
            foreach (var gallery in boatDetails.BoatGallery)
            {
                var boatGallery = _objectMapper.Map<BoatGalleryRequestable, BoatGalleryEntity>(gallery);
                if (boatGallery.Id == 0)
                {
                    boatGallery.BoatEntityId = boatDetails.Id;
                    string uploadedFilePath = boatGallery.ImagePath;//FileUploader.UploadFilesLocal(gallery.FileName, gallery.FileData);
                    await FileUploader.UploadFileToAWSAsync(gallery.FileName, gallery.FileData, "boatGallery", "");
                    boatGallery.ImagePath = gallery.FileName;
                    await _boatGalleryRepo.InsertAsync(boatGallery).ConfigureAwait(false);
                }
            }
            //Features Removed
            var boatAllFeatures = await _boatelFeatureRepo.GetListAsync(res => res.BoatEntityId == boatEntity.Id).ConfigureAwait(false);
            foreach (var f in boatAllFeatures)
            {
                var findFeature = boatDetails.BoatFeatures.Any(res => res.Id == f.OfferedFeaturesId);
                if (findFeature == false)
                {
                    await _boatelFeatureRepo.DeleteAsync(f).ConfigureAwait(false);
                }
            }
            //Features added
            foreach (var features in boatDetails.BoatFeatures)
            {
                var boatFeatures = new BoatFeatureEntity();
                if (features.Id == null)
                {
                    var featureEntity = _objectMapper.Map<BoatFeaturesRequestable, FeatureEntity>(features);
                    featureEntity.CreatorId = userId;
                    featureEntity.CreationTime = DateTime.Now;
                    var response = await _featuresRepo.InsertAsync(featureEntity, autoSave: true).ConfigureAwait(false);
                    features.Id = response.Id;
                }
                var getFeature = await _boatelFeatureRepo.FindAsync(res => res.OfferedFeaturesId == features.Id && res.BoatEntityId == boatEntity.Id).ConfigureAwait(false);
                if (getFeature == null)
                {
                    boatFeatures.OfferedFeaturesId = features.Id;
                    boatFeatures.BoatEntityId = boatDetails.Id;
                    boatFeatures.CreatorId = userId;
                    boatFeatures.CreationTime = DateTime.Now;
                    boatFeatures.LastModifierId = boatEntity.CreatorId = userId;
                    await _boatelFeatureRepo.InsertAsync(boatFeatures).ConfigureAwait(false);
                }
            }
            //Rules Removed
            var boatAllRules = await _boatelRulesRepo.GetListAsync(res => res.BoatEntityId == boatEntity.Id).ConfigureAwait(false);
            foreach (var r in boatAllRules)
            {
                var findRule = boatDetails.BoatRules.Any(res => res.Id == r.OfferedRuleId);
                if (findRule == false)
                {
                    await _boatelRulesRepo.DeleteAsync(r).ConfigureAwait(false);
                }
            }
            //Rules added
            foreach (var rule in boatDetails.BoatRules)
            {
                var boatRule = new BoatRuleEntity();
                if (rule.Id == null)
                {
                    var ruleEntity = _objectMapper.Map<BoatRulesRequestable, RuleEntity>(rule);
                    ruleEntity.CreatorId = userId;
                    ruleEntity.CreationTime = DateTime.Now;
                    var response = await _rulesRepo.InsertAsync(ruleEntity, autoSave: true).ConfigureAwait(false);
                    rule.Id = response.Id;
                }
                var getRule = await _boatelRulesRepo.FindAsync(res => res.OfferedRuleId == rule.Id && res.BoatEntityId == boatEntity.Id).ConfigureAwait(false);
                if (getRule == null)
                {
                    boatRule.OfferedRuleId = rule.Id;
                    boatRule.BoatEntityId = boatDetails.Id;
                    boatRule.CreatorId = userId;
                    boatRule.CreationTime = DateTime.Now;
                    await _boatelRulesRepo.InsertAsync(boatRule, autoSave: true).ConfigureAwait(false);
                }
            }
            var res = await _boatRepository.UpdateAsync(boatEntity, autoSave: true).ConfigureAwait(false);
            return true;
        }
    }
}
