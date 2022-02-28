using System;
using System.Collections.Generic;
using System.Linq;
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
using BnBYachts.Events;
using Volo.Abp.ObjectMapping;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Shared.Model;

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
        private readonly IRepository<EventEntity, int> _eventRepository;
        //Lookups
        private readonly IRepository<RuleEntity, int> _rulesRepo;
        private readonly IRepository<FeatureEntity, int> _featuresRepo;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;


        public HostBoatManager(IRepository<RuleEntity, int> rulesRepo,
            IRepository<FeatureEntity, int> featuresRepo, IRepository<BoatEntity, int> boatRepository,
            IRepository<CharterEntity, int> charterRepository, IRepository<BoatEntity, int> repository,
            IRepository<BoatFeatureEntity, int> boatelFeatureRepo, IRepository<BoatRuleEntity, int> boatelRulesRep,
            IRepository<BoatCalendarEntity, int> boatelCalendarRepo, IRepository<BoatGalleryEntity, int> boatGalleryRepo,
            IRepository<EventEntity, int> eventRepository,
            IObjectMapper<BoatDomainModule> objectMapper)
        {

            _boatRepository = repository;
            _boatelFeatureRepo = boatelFeatureRepo;
            _boatelCalendarRepo = boatelCalendarRepo;
            _boatelRulesRepo = boatelRulesRep;
            _charterRepository = charterRepository;
            _rulesRepo = rulesRepo;
            _featuresRepo = featuresRepo;
            _objectMapper = objectMapper;
            _boatGalleryRepo = boatGalleryRepo;
            _eventRepository = eventRepository;
        }
        public async Task<HostBoatRequestable> Insert(HostBoatRequestable input)
        {
            await _boatRepository.InsertAsync(_objectMapper.Map<HostBoatRequestable, BoatEntity>(input), true);
            return new HostBoatRequestable();
        }
        public async Task<ICollection<BoatEntity>> GetBoatelsByFilters(BoatelSearchFiltersRequestable parameters)
        {
            try
            {
                //parameters.Latitude = 31.5204;
                //parameters.Longitude = 74.3587;
                var getBoats = await _boatRepository.GetListAsync(res => res.IsBoatelServicesOffered == true && res.IsActive == true);

                var filterdBoats = new List<BoatEntity>();
                foreach (var boat in getBoats)
                {
                    await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatGalleries).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatCalendars).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatFeatures).ConfigureAwait(false);
                    double distance = GetDistanceInMeters(boat.Latitude, boat.Longitude, parameters.Latitude, parameters.Longitude);
                    var boatCalendar = boat.BoatCalendars.FirstOrDefault(res => res.BoatEntityId == boat.Id && res.IsAvailable && res.FromDate > DateTime.Now);
                    if (distance <= 500 && boatCalendar != null)
                    {
                        filterdBoats.Add(boat);
                    }
                }
                ////Checkin Checkout Date filters
                if (parameters.CheckinDate.HasValue && parameters.CheckoutDate.HasValue)
                {
                    foreach (var boat in filterdBoats.ToArray())
                    {
                        var findAvailability = boat.BoatCalendars.FirstOrDefault(res => res.BoatEntityId == boat.Id && 
                        (res.FromDate > parameters.CheckinDate && res.ToDate < parameters.CheckinDate) 
                        || (res.FromDate > parameters.CheckoutDate && res.ToDate < parameters.CheckoutDate) 
                        || (res.FromDate < parameters.CheckinDate && res.ToDate > parameters.CheckoutDate) 
                        || (res.FromDate == parameters.CheckinDate || res.ToDate == parameters.CheckoutDate) && res.IsAvailable);
                        if (findAvailability == null)
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
            boatCalendar.LastModifierId = boatCalendar.CreatorId = userId;
            await _boatelCalendarRepo.InsertAsync(boatCalendar).ConfigureAwait(false);
            return true;
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
            await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatCalendars).ConfigureAwait(false);
            return boat;
        }
        public async Task<ICollection<CharterEntity>> GetChartersByFilters(CharterSearchRequestable param)
        {
            var getCharters = await _charterRepository.GetListAsync(res=>res.DepartureFromDate >= DateTime.Now && res.IsActive == true);
            var filterdCharters = new List<CharterEntity>();
            foreach (var charter in getCharters)
            {
                double departureDistance = GetDistanceInMeters(charter.DepartingLatitude, charter.DepartingLongitude, param.DepartureLatitude, param.DepartureLongitude);
                double destinationDistance = GetDistanceInMeters(charter.DestinationLatitude, charter.DestinationLongitude, param.DestinationLatitude, param.DestinationLongitude);
                if (departureDistance <= 500 && destinationDistance <= 500)
                {
                    await _charterRepository.EnsurePropertyLoadedAsync(charter, x => x.Boat).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, x => x.BoatGalleries).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, x => x.BoatFeatures).ConfigureAwait(false);

                    filterdCharters.Add(charter);
                }
            }
            ///guest Filters
            return (filterdCharters
                .WhereIf(param.DepartureDate != null, res => res.DepartureFromDate.Date == param.DepartureDate)
                .WhereIf(param.Adults > 0 || param.Childrens > 0, res => res.GuestCapacity > param.Adults + param.Childrens)).ToList();
        } 
        public async Task<CharterDetailsTransferable> GetCharterDetailsById(int charterId)
        {
            var charter = await _charterRepository.GetAsync(b => b.Id == charterId, false).ConfigureAwait(false);
            var allCharters = await _charterRepository.GetListAsync(b => b.BoatId == charter.BoatId, false).ConfigureAwait(false);
            await _charterRepository.EnsurePropertyLoadedAsync(charter, x => x.Boat).ConfigureAwait(false);
            await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, x => x.BoatGalleries).ConfigureAwait(false);
            await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, x => x.BoatFeatures).ConfigureAwait(false);
            foreach (var feature in charter.Boat.BoatFeatures)
            {
                await _boatelFeatureRepo.EnsurePropertyLoadedAsync(feature, x => x.OfferedFeatures);
            }
            await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, x => x.BoatRules).ConfigureAwait(false);
            foreach (var rule in charter.Boat.BoatRules)
            {
                await _boatelRulesRepo.EnsurePropertyLoadedAsync(rule, x => x.OfferedRule);
            }
            await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, x => x.BoatLocations).ConfigureAwait(false);

            var charterSchedule = new List<CharterAvailableDates>();
            foreach (var ch in allCharters)
            {
                charterSchedule.Add(new CharterAvailableDates { DepartureDate = ch.DepartureFromDate, CharterId = ch.Id });
            }
            return new CharterDetailsTransferable
            {
                charterDetails = charter,
                charterSchedule = charterSchedule
            };
        }
        public async Task<ICollection<EventEntity>> GetEventsByFilters(EventSearchRequestable param)
        {
            var getEvents = await _eventRepository.GetListAsync(res=>res.StartDateTime > DateTime.Now && res.IsActive == true);


            var filterdEvents = new List<EventEntity>();
            foreach (var evnt in getEvents)
            {
                double distance = GetDistanceInMeters(evnt.LocationLat, evnt.LocationLong, param.Latitude, param.Longitude);
                if (distance <= 500)
                {
                    await _eventRepository.EnsurePropertyLoadedAsync(evnt, x => x.Boat).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(evnt.Boat, x => x.BoatGalleries).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(evnt.Boat, x => x.BoatFeatures).ConfigureAwait(false);
                    if (param.EventDate.HasValue)
                    {
                        if ((evnt.StartDateTime.Date < param.EventDate.Value.Date && evnt.EndDateTime.Date > param.EventDate.Value) || (evnt.StartDateTime.Date == param.EventDate.Value.Date))
                        {
                            filterdEvents.Add(evnt);
                        }
                    }
                    else
                    {
                        filterdEvents.Add(evnt);
                    }
                }
            }
            ///guest Filters
            return filterdEvents.WhereIf(param.Adults > 0 || param.Childrens > 0, res => res.GuestCapacity > param.Adults + param.Childrens).ToList();
        }
        public async Task<EventDetailTransferable> GetEventsDetailsById(int eventId)
        {
            var eventDetail = await _eventRepository.GetAsync(b => b.Id == eventId, false).ConfigureAwait(false);
            var allEvents = await _eventRepository.GetListAsync(res => res.BoatId == eventDetail.BoatId);
            await _eventRepository.EnsurePropertyLoadedAsync(eventDetail, x => x.Boat).ConfigureAwait(false);
            await _boatRepository.EnsureCollectionLoadedAsync(eventDetail.Boat, x => x.BoatGalleries).ConfigureAwait(false);
            await _boatRepository.EnsureCollectionLoadedAsync(eventDetail.Boat, x => x.BoatCalendars).ConfigureAwait(false);
            await _boatRepository.EnsureCollectionLoadedAsync(eventDetail.Boat, x => x.BoatFeatures).ConfigureAwait(false);
            foreach (var feature in eventDetail.Boat.BoatFeatures)
            {
                await _boatelFeatureRepo.EnsurePropertyLoadedAsync(feature, x => x.OfferedFeatures);
            }
            await _boatRepository.EnsureCollectionLoadedAsync(eventDetail.Boat, x => x.BoatRules).ConfigureAwait(false);
            foreach (var rule in eventDetail.Boat.BoatRules)
            {
                await _boatelRulesRepo.EnsurePropertyLoadedAsync(rule, x => x.OfferedRule);
            }
            await _boatRepository.EnsureCollectionLoadedAsync(eventDetail.Boat, x => x.BoatLocations).ConfigureAwait(false);

            var eventSchedule = new List<EventSchedule>();
            foreach (var ev in allEvents)
            {
                eventSchedule.Add(new EventSchedule { EventDate = ev.StartDateTime, EventId = ev.Id });
            }
            return new EventDetailTransferable
            {
                eventDetails = eventDetail,
                eventSchedule = eventSchedule
            };
        }

        #region Host Onboarding

        public async Task<HostLookupTransferable> GetHostOnBoardingLookup(Guid? userId)
        {
            var rules = await _rulesRepo.GetListAsync(r => r.IsDefault == true || r.CreatorId == userId).ConfigureAwait(false);
            var features = await _featuresRepo.GetListAsync(r => r.IsDefaultFeature == true || r.CreatorId == userId).ConfigureAwait(false);
            var data = HostLookupFactory.Contruct(rules, features);
            return data;
        }

        public async Task<BoatAddResponseTransferable> AddHostBoatManager(HostBoatRequestable boatDetails, Guid? userId)
        {
            //boat
            var totalBoats = await _boatRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false);
            //Host Role
            var dataResponse = new BoatAddResponseTransferable();
            dataResponse.IsHostExists = totalBoats.Count == 0 ? false : true;
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
                string uploadedFilePath = boatGallery.ImagePath;//FileUploader.UploadFilesLocal(gallery.FileName, gallery.FileData);
                await FileUploader.UploadFileToAWSAsync(gallery.FileName, gallery.FileData, "boatGallery", "");
                boatGallery.ImagePath = gallery.FileName;
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
            dataResponse.IsSuccess = true;
            dataResponse.Id = postBoatData.Id;
            return dataResponse;
        }


        public async Task<bool> UpdateBoatLocation(BoatLocationRequestable boatDetails, Guid? userId)
        {
            var boat = await _boatRepository.FindAsync(res => res.Id == boatDetails.BoatId).ConfigureAwait(false);
            boat.Location = boatDetails.Location;
            boat.Latitude = boatDetails.Latitude;
            boat.Longitude = boatDetails.Longitude;
            boat.LastModifierId = userId;
            boat.LastModificationTime = DateTime.Now;
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

        public async Task<EntityResponseListModel<BoatDTO>> GetHostBoats(Guid? userId,int pageNo, int pageSize)
        {
            var response = new EntityResponseListModel<BoatDTO>();
            var boats = await _boatRepository.GetListAsync(x => x.CreatorId == userId).ConfigureAwait(false);
            foreach (var boat in boats)
            {
                await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatGalleries).ConfigureAwait(false);
            }
            var boatListing =  _objectMapper.Map<List<BoatEntity>, List<BoatDTO>>(boats);
            response.TotalCount = boats.Count;
            response.Data = await PagedList<BoatDTO>.CreateAsync(boatListing,pageNo,pageSize).ConfigureAwait(false);
            return response;
        }

        #region Features
        public async Task<ICollection<FeatureEntity>> GetDefaultFeatures()
        {
            return await _featuresRepo.GetListAsync(x => x.IsDefaultFeature == true).ConfigureAwait(false);
        }
        #endregion
        public async Task<bool> UpdateboatStatus(long boatId)
        {
            var boat = await _boatRepository.FindAsync(x => x.Id == boatId).ConfigureAwait(false);
            boat.IsActive = !boat.IsActive;
            return true;

        }
        public async Task<List<BoatDTO>> GetBoatDetailsByUserId(Guid? userId)
        {
            var boats = await _boatRepository.GetListAsync(x => x.CreatorId == userId).ConfigureAwait(false);
            foreach (var boat in boats)
                await _boatRepository.EnsureCollectionLoadedAsync(boat, x => x.BoatGalleries).ConfigureAwait(false);
            return _objectMapper.Map<List<BoatEntity>, List<BoatDTO>>(boats);
        }
    }
}
