using BnBYachts.Boat;
using BnBYachts.Boat.ViewModel;
using BnBYachts.ViewModel.Boat;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;

namespace BnBYachts.Services.Boat
{
    public class HostBoatService : ApplicationService
    {
        private readonly IHostBoatManager _hostBoatManager;
        public HostBoatService(IHostBoatManager hostBoatManager)
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

        [Route("boat-details/{boatId}")]
        [HttpGet]
        public async Task<BoatEntity> GetBoatDetailsById(int boatId)
        {
            var boat = await _hostBoatManager.GetBoatDetailsById(boatId);
            return boat;
        }
        [Route("host-boat-details")]
        [HttpGet]
        public async Task<ICollection<BoatEntity>> GetHostBoatDetails()
        {
            var boat = await _hostBoatManager.GetHostBoats(CurrentUser.Id);
            return boat;
        }
       
    }
}
