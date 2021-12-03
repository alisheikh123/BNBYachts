using BnBYachts.Boat;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Microsoft.AspNetCore.Authorization;
using BnBYachts.Boat.Shared.Boat.Transferable;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;

namespace BnBYachts.Services.Boat
{
    [Authorize]
    public class HostBoatAppService : ApplicationService
    {
        private readonly IHostBoatManager _hostBoatManager;
        public HostBoatAppService(IHostBoatManager hostBoatManager)
        {
            _hostBoatManager = hostBoatManager;
        }

        [Route("FilterBoatelBoats")]
        [HttpPost]
        public async Task<ICollection<BoatEntity>> GetBoatelsByFilters(BoatelSearchFiltersRequestable parameters)
        {
            try
            {
                var result = await _hostBoatManager.GetBoatelsByFilters(parameters);
                return result;
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
                bool response = await _hostBoatManager.BoatCalendarUpdate(boatCalendar, CurrentUser.Id);
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [Route("FilterChartersBoats")]
        [HttpPost]
        public async Task<ICollection<CharterEntity>> GetChartersByFilters(CharterSearchRequestable parameters) 
        {
            var response = await _hostBoatManager.GetChartersByFilters(parameters);
            return response;
        }
        [Route("boat-details/{boatId}")]
        [HttpGet]
        public async Task<BoatEntity> GetBoatDetailsById(int boatId)
        {
            var boat = await _hostBoatManager.GetBoatDetailsById(boatId);
            return boat;
        }

        [Route("FilterEventsBoats")]
        [HttpPost]
        public async Task<ICollection<EventEntity>> GetEventsByFilters(EventSearchRequestable parameters)
        {
            var response = await _hostBoatManager.GetEventsByFilters(parameters);
            return response;
        }

        [Route("charter-details/{charterId}")]
        [HttpGet]
        public async Task<CharterDetailsTransferable> GetCharterDetailsById(int charterId)
        {
            var charter = await _hostBoatManager.GetCharterDetailsById(charterId);
            return charter;
        }
        [Route("event-details/{eventId}")]
        [HttpGet]
        public async Task<EventDetailTransferable> GetEventDetailsById(int eventId)
        {
            var eventData = await _hostBoatManager.GetEventsDetailsById(eventId);
            return eventData;
        }

        #region Host On Boarding
        [Route("GetHostOnBoardingLookup")]
        [HttpGet]
        public async Task<HostLookupTransferable> GetHostOnBoardingLookup()
        {
            var data = await _hostBoatManager.GetHostOnBoardingLookup(CurrentUser.Id);
            return data;
        }
        [Route("add-host-boats")]
        [HttpPost]
        public async Task<bool> AddHostBoats(HostBoatRequestable boatDetails)
        {
            var data = await _hostBoatManager.AddHostBoatManager(boatDetails, CurrentUser.Id);
            return true;
        }
        #endregion

        [Route("host-boat-details")]
        [HttpGet]
        public async Task<ICollection<BoatEntity>> GetHostBoatDetails()
        {
            return await _hostBoatManager.GetHostBoats(CurrentUser.Id).ConfigureAwait(false);
        }       
    }
}
