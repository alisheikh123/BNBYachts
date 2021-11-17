using BnBYachts.Boat;
using BnBYachts.Boat.Enum;
using BnBYachts.Boat.ViewModel;
using BnBYachts.Boats.Charter;
using BnBYachts.Helpers;
using BnBYachts.Interfaces.Boat;
using BnBYachts.ViewModel.Boat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using BnByachts.SharedModule;
using BnByachts.SharedModule.Manager.Boat.Requestable;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Services.Boat
{
    public class HostBoatService : CrudAppService<BoatEntity, BoatDto, int, PagedAndSortedResultRequestDto, BoatDto>, IHostBoatService
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<BoatFeatureEntity, int> _boatelFeatureRepo;
        private readonly IRepository<BoatRuleEntity, int> _boatelRulesRepo;
        private readonly IRepository<BoatCalendarEntity, int> _boatelCalendarRepo;
        //Charters
        private readonly IRepository<CharterEntity, int> _charterRepository;
        public HostBoatService(IRepository<CharterEntity, int> charterRepository, IRepository<BoatEntity, int> repository, IRepository<BoatFeatureEntity, int> boatelFeatureRepo, IRepository<BoatRuleEntity, int> boatelRulesRep, IRepository<BoatCalendarEntity, int> boatelCalendarRepo)
           : base(repository)
        {
            _boatRepository = repository;
            _boatelFeatureRepo = boatelFeatureRepo;
            _boatelCalendarRepo = boatelCalendarRepo;
            _boatelRulesRepo = boatelRulesRep;
            _charterRepository = charterRepository;
        }

        [Route("FilterBoatelBoats")]
        [HttpPost]
        public async Task<List<BoatEntity>> GetBoatelsByFilters(SearchFilters parameters)
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
                    double distance = DistanceMeasurment.GetDistanceInMeters(boat.Latitude, boat.Longitude, parameters.Latitude, parameters.Longitude);
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
                        var findAvailability = boat.BoatCalendars.FirstOrDefault(res => (res.FromDate < parameters.CheckinDate && res.ToDate > parameters.CheckinDate) || ( res.FromDate < parameters.CheckoutDate && res.ToDate > parameters.CheckoutDate) || (res.FromDate > parameters.CheckinDate && res.ToDate < parameters.CheckoutDate) || (res.FromDate == parameters.CheckinDate || res.ToDate == parameters.CheckoutDate) && !res.IsAvailable);
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

        [Route("BoatCalendarUpdate")]
        [HttpPost]
        public async Task<bool> BoatCalendarUpdate(BoatCalendarEntity boatCalendar)
        {
            try
            {
                boatCalendar.LastModifierId = boatCalendar.CreatorId = CurrentUser.Id;
                await _boatelCalendarRepo.InsertAsync(boatCalendar).ConfigureAwait(false);
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [Route("FilterChartersBoats")]
        [HttpPost]
        public async Task<List<BoatEntity>> GetChartersByFilters(CharterFilters param)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        [Route("FilterEventsBoats")]
        [HttpPost]
        public async Task<List<BoatEntity>> GetEventsByFilters(SearchFilters parameters)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [Route("boatSave")]
        public async void InsertBoat(CancellationToken cancellationToken)
        {
            

            //boat.Length = 200;
            //boat.TotalBedrooms = 2;
            //boat.TotalWashrooms = 3;
            //boat.IsBoatelServicesOffered = true;
            //boat.BoatelAvailabilityDays = 20;
            //boat.CheckinTime = new DateTime();
            //boat.CheckoutTime = new DateTime().AddDays(3);
            ////     Latitude Longitude
            //boat.Latitude = 32.073978;
            //boat.Longitude = 72.686073;
            //boat.PerDayCharges = 200;
            //boat.IsActive = true;
            //boat.BoatType = BoatTypes.PowerBoat;
            //boat.CreationTime = new DateTime();
            //try
            //{
            //    await _boatRepository.InsertAsync(boat, true, cancellationToken);
            //}
            //catch (Exception ex)
            //{

            //    throw;
            //}
        }

        [Route("boat-details/{boatId}")]
        [HttpGet]
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
    }
}
