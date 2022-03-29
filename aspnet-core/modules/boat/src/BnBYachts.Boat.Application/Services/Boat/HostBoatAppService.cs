using BnBYachts.Boat;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Boat.Transferable;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Shared.Model;

namespace BnBYachts.Services.Boat
{
    public class HostBoatAppService : ApplicationService
    {
        private readonly IHostBoatManager _hostBoatManager;
        public HostBoatAppService(IHostBoatManager hostBoatManager)
        {
            _hostBoatManager = hostBoatManager;
        }

        [HttpPost]
        public async Task<ICollection<BoatEntity>> GetBoatelsByFilters(BoatelSearchFiltersRequestable parameters) => await _hostBoatManager.GetBoatelsByFilters(parameters);

        [HttpPost]
        public async Task<bool> BoatCalendarUpdate(BoatCalendarEntity boatCalendar) => await _hostBoatManager.BoatCalendarUpdate(boatCalendar, CurrentUser.Id);
        

        [HttpPost]
        public async Task<ICollection<CharterEntity>> GetChartersByFilters(CharterSearchRequestable parameters) 
        {
            var response = await _hostBoatManager.GetChartersByFilters(parameters);
            return response;
        }
        [HttpGet]
        public async Task<BoatEntity> GetBoatDetailsById(int boatId)
        {
            var boat = await _hostBoatManager.GetBoatDetailsById(boatId);
            return boat;
        }

        [HttpPost]
        public async Task<ICollection<EventEntity>> GetEventsByFilters(EventSearchRequestable parameters)
        {
            var response = await _hostBoatManager.GetEventsByFilters(parameters);
            return response;
        }

        [HttpGet]
        public async Task<CharterDetailsTransferable> GetCharterDetailsById(int charterId)
        {
            var charter = await _hostBoatManager.GetCharterDetailsById(charterId);
            return charter;
        }
        [HttpGet]
        public async Task<EventDetailTransferable> GetEventDetailsById(int eventId)
        {
            var eventData = await _hostBoatManager.GetEventsDetailsById(eventId);
            return eventData;
        }

        #region Host On Boarding
        [HttpGet]
        public async Task<HostLookupTransferable> GetHostOnBoardingLookup()
        {
            var data = await _hostBoatManager.GetHostOnBoardingLookup(CurrentUser.Id);
            return data;
        }
        [HttpPost]
        public async Task<BoatAddResponseTransferable> AddHostBoats(HostBoatRequestable boatDetails)
        {
            var data = await _hostBoatManager.AddHostBoatManager(boatDetails, CurrentUser.Id);
            return data;
        }

        [HttpPost]
        public async Task<bool> updateBoatLocation(BoatLocationRequestable boat)
        {
            return await _hostBoatManager.UpdateBoatLocation(boat,CurrentUser.Id);
        }
        #endregion

        public async Task<EntityResponseListModel<BoatDTO>> GetHostBoats(int pageNo, int pageSize)
        {
            return await _hostBoatManager.GetHostBoats(CurrentUser.Id, pageNo, pageSize).ConfigureAwait(false);
        }

        #region Features
        [HttpGet]
        public async Task<ICollection<FeatureEntity>> GetDefaultFeatures()
        {
            var result =  await _hostBoatManager.GetDefaultFeatures().ConfigureAwait(false);
            return result;
        }
        #endregion
        [HttpGet]
        public async Task<bool> UpdateHostBoatStatus(long boatId)
        {
            var boatStatus = await _hostBoatManager.UpdateboatStatus(boatId).ConfigureAwait(false);
            return boatStatus;
        }
        public async Task<List<BoatDTO>> GetBoatDetailsByUserId(Guid? userId) => await _hostBoatManager.GetBoatDetailsByUserId(userId);
        public async Task<EntityResponseModel> GetBoatsListByCity(string cityName) => await _hostBoatManager.GetBoatsListByCity(cityName).ConfigureAwait(false);
        public async Task<EntityResponseModel> GetChartersListByCity(string cityName) => await _hostBoatManager.GetChartersListByCity(cityName).ConfigureAwait(false);
        public async Task<EntityResponseModel> GetEventsListByCity(string cityName) => await _hostBoatManager.GetEventsListByCity(cityName).ConfigureAwait(false);

    }
}
