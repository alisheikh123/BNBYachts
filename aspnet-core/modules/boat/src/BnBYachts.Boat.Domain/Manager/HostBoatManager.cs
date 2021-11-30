using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.Boat.Enum;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boats.Charter;
using BnBYachts.Boat.Shared.Boat.Transferable;
using BnBYachts.Boat.Helpers;
using BnBYachts.Boat.Shared.Helper;

namespace BnBYachts.Boat.Manager
{
    public class HostBoatManager : DomainService, IHostBoatManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<BoatFeatureEntity, int> _boatelFeatureRepo;
        private readonly IRepository<BoatRuleEntity, int> _boatelRulesRepo;
        private readonly IRepository<BoatCalendarEntity, int> _boatelCalendarRepo;
        private readonly IRepository<BoatGalleryEntity, int> _boatGalleryRepo;
        //Charters
        private readonly IRepository<CharterEntity, int> _charterRepository;
        //Lookups
        private readonly IRepository<RuleEntity, int> _rulesRepo;
        private readonly IRepository<FeatureEntity, int> _featuresRepo;


        public HostBoatManager(IRepository<RuleEntity, int> rulesRepo, IRepository<FeatureEntity, int> featuresRepo, IRepository<BoatEntity, int> boatRepository, IRepository<CharterEntity, int> charterRepository, IRepository<BoatEntity, int> repository, IRepository<BoatFeatureEntity, int> boatelFeatureRepo, IRepository<BoatRuleEntity, int> boatelRulesRep, IRepository<BoatCalendarEntity, int> boatelCalendarRepo, IRepository<BoatGalleryEntity, int> boatGalleryRepo)
        {
            _boatRepository = repository;
            _boatelFeatureRepo = boatelFeatureRepo;
            _boatelCalendarRepo = boatelCalendarRepo;
            _boatelRulesRepo = boatelRulesRep;
            _charterRepository = charterRepository;
            _rulesRepo = rulesRepo;
            _featuresRepo = featuresRepo;
            _boatGalleryRepo = boatGalleryRepo;
        }
        public async Task<HostBoatRequestable> Insert(HostBoatRequestable input)
        {
            var boat = new BoatEntity
            {
                Name = "my Boat",
                Length = 200,
                TotalBedrooms = 2,
                TotalWashrooms = 3,
                IsBoatelServicesOffered = true,
                BoatelAvailabilityDays = 20,
                CheckinTime = new DateTime(),
                CheckoutTime = new DateTime().AddDays(3),
                Latitude = 32.073978,
                Longitude = 72.686073,
                PerDayCharges = 200,
                IsActive = true,
                BoatType = BoatTypes.PowerBoat,
                CreationTime = new DateTime()
            };
            var response = await _boatRepository.InsertAsync(boat, true);
            return new HostBoatRequestable();

        }
        public async Task<ICollection<BoatEntity>> GetBoatelsByFilters(BoatelSearchFiltersRequestable parameters)
        {
            try
            {
                //parameters.Latitude = 31.5204;
                //parameters.Longitude = 74.3587;
                var getBoats = await _boatRepository.GetListAsync(res => res.IsBoatelServicesOffered == true);

                var filterdBoats = new List<BoatEntity>();
                foreach (var boat in getBoats)
                {
                    await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatGalleries).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatCalendars).ConfigureAwait(false);
                    double distance = GetDistanceInMeters(boat.Latitude, boat.Longitude, parameters.Latitude, parameters.Longitude);
                    if (distance <= 500)
                    {
                        filterdBoats.Add(boat);
                    }
                }
                ////Checkin Checkout Date filters
                if (parameters.CheckinDate.HasValue && parameters.CheckoutDate.HasValue)
                {
                    foreach (var boat in filterdBoats.ToArray())
                    {
                        var findAvailability = boat.BoatCalendars.FirstOrDefault(res => (res.FromDate < parameters.CheckinDate && res.ToDate > parameters.CheckinDate) || (res.FromDate < parameters.CheckoutDate && res.ToDate > parameters.CheckoutDate) || (res.FromDate > parameters.CheckinDate && res.ToDate < parameters.CheckoutDate) || (res.FromDate == parameters.CheckinDate || res.ToDate == parameters.CheckoutDate) && !res.IsAvailable);
                        if (findAvailability != null)
                        {
                            filterdBoats.Remove(boat);
                        }
                    }
                }
                ///guest Filters
                return filterdBoats.WhereIf(parameters.Adults > 0 || parameters.Childrens > 0, res => res.BoatelCapacity > parameters.Adults + parameters.Childrens).ToList();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<bool> BoatCalendarUpdate(BoatCalendarEntity boatCalendar, Guid? userId)
        {
            try
            {
                boatCalendar.LastModifierId = boatCalendar.CreatorId = userId;
                await _boatelCalendarRepo.InsertAsync(boatCalendar).ConfigureAwait(false);
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<BoatEntity> GetBoatDetailsById(int boatId)
        {
            var boat = await _boatRepository.GetAsync(b => b.Id == boatId, false).ConfigureAwait(false);

            await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatGalleries).ConfigureAwait(false);
            await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatFeatures).ConfigureAwait(false);
            foreach (var feature in boat.BoatFeatures)
            {
                await _boatelFeatureRepo.EnsurePropertyLoadedAsync(feature, x => x.OfferedFeatures);
            }
            await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatRules).ConfigureAwait(false);
            foreach (var rule in boat.BoatRules)
            {
                await _boatelRulesRepo.EnsurePropertyLoadedAsync(rule, x => x.OfferedRule);
            }
            await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatLocations).ConfigureAwait(false);

            return boat;
        }
        #region Host Onboarding

        public async Task<HostLookupTransferable> GetHostOnBoardingLookup(Guid? userId)
        {
            var rules = await _rulesRepo.GetListAsync(r => r.IsDefault == true || r.CreatorId == userId).ConfigureAwait(false);
            var features = await _featuresRepo.GetListAsync(r => r.IsDefaultFeature == true || r.CreatorId == userId).ConfigureAwait(false);
            var data = HostLookupFactory.Contruct(rules, features);
            return data;
        }

        public async Task<bool> AddHostBoatManager(HostBoatRequestable boatDetails, Guid? userId)
        {
            //boat
            var boat = boatDetails.CreateMapped<HostBoatRequestable, BoatEntity>();
            boat.CreationTime = DateTime.Now;
            boat.LastModifierId = boat.CreatorId = userId;
            boat.BoatType = (BoatTypes)(boatDetails.BoatType);
            var postBoatData = await _boatRepository.InsertAsync(boat, autoSave: true);
            //Gallery added
            foreach (var gallery in boatDetails.BoatGallery)
            {
                var boatGallery = gallery.CreateMapped<BoatGalleryRequestable, BoatGalleryEntity>();
                boatGallery.BoatEntityId = postBoatData.Id;
                string uploadedFilePath = FileUploader.UploadFilesLocal(gallery.FileName, gallery.FileData);
                //await S3FileUploader.UploadFileToAWSAsync(gallery.FileName, gallery.FileData, "boatGallery", "");
                boatGallery.ImagePath = uploadedFilePath;
                await _boatGalleryRepo.InsertAsync(boatGallery).ConfigureAwait(false);

            }
            //Features added
            foreach (var features in boatDetails.BoatFeatures)
            {
                var boatFeatures = new BoatFeatureEntity();
                if (features.Id == null)
                {
                    var featureEntity = features.CreateMapped<BoatFeaturesRequestable, FeatureEntity>();
                    featureEntity.CreatorId = userId;
                    featureEntity.CreationTime = DateTime.Now;
                    var response = await _featuresRepo.InsertAsync(featureEntity, autoSave: true).ConfigureAwait(false);
                    features.Id = response.Id;
                }
                boatFeatures.OfferedFeaturesId = features.Id; //CreateMapped<BoatFeaturesRequestable, FeatureEntity>();
                boatFeatures.BoatEntityId = postBoatData.Id;
                boatFeatures.CreatorId = userId;
                boatFeatures.CreationTime = DateTime.Now;
                boatFeatures.LastModifierId = boat.CreatorId = userId;
                await _boatelFeatureRepo.InsertAsync(boatFeatures, autoSave: true).ConfigureAwait(false);
            }
            //Rules added
            foreach (var rule in boatDetails.BoatRules)
            {
                var boatRule = new BoatRuleEntity();
                if (rule.Id == null)
                {
                    var ruleEntity = rule.CreateMapped<BoatRulesRequestable, RuleEntity>();
                    ruleEntity.CreatorId = userId;
                    ruleEntity.CreationTime = DateTime.Now;
                    var response = await _rulesRepo.InsertAsync(ruleEntity, autoSave: true).ConfigureAwait(false);
                    rule.Id = response.Id;
                }
                boatRule.OfferedRuleId = rule.Id;
                boatRule.BoatEntityId = postBoatData.Id;
                boatRule.CreatorId = userId;
                boatRule.CreationTime = DateTime.Now;
                await _boatelRulesRepo.InsertAsync(boatRule, autoSave: true).ConfigureAwait(false);
            }
            ////Calendar added
            var boatCalendar = boatDetails.BoatCalendar.CreateMapped<BoatCalendarRequestable, BoatCalendarEntity>();
            boatCalendar.BoatEntityId = postBoatData.Id;
            boatCalendar.IsAvailable = true;
            await _boatelCalendarRepo.InsertAsync(boatCalendar, autoSave: true).ConfigureAwait(false);
            return true;
        }

        #endregion





        ///helpers
        public static double GetDistanceInMeters(double sLat, double sLong, double dLat, double dLong)
        {
            var d1 = sLat * (Math.PI / 180.0);
            var num1 = sLong * (Math.PI / 180.0);
            var d2 = dLat * (Math.PI / 180.0);
            var num2 = dLong * (Math.PI / 180.0) - num1;
            var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) + Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);

            var distanceInMM = 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
            var distanceinMeter = distanceInMM; //* 0.001;
            return distanceinMeter;
        }

        public async Task<ICollection<BoatEntity>> GetHostBoats(Guid? userId)
        {
            var boats = await _boatRepository.GetListAsync(x => x.CreatorId == userId).ConfigureAwait(false);
            foreach (var boat in boats)
            {
                await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatGalleries).ConfigureAwait(false);
            }
            return boats;


        }

        public async Task<bool> UpdateboatStatus(long boatId, bool IsActive)
        {
            var boat = await _boatRepository.FindAsync(x => x.Id == boatId).ConfigureAwait(false);
            boat.IsActive = IsActive==false ? true : false;
            return true;

        }
    }
}
