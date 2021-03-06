using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Boat.Interfaces.Boat;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Boat
{
    [Authorize]
    public class EventAppService : ApplicationService, IEventAppService
    {
        private readonly IEventManager _eventManager;
        public EventAppService(IEventManager eventManager)
        {
            _eventManager = eventManager;
        }

        public async Task<BoatEventCalendarTransferable> GetBoatBookedDates(int boatId) => await _eventManager.GetBoatBookedDates(boatId).ConfigureAwait(false);
        public async Task<ICollection<BoatLookupTransferable>> GetBoats() => await _eventManager.GetBoats(CurrentUser.Id);
       public async Task<ICollection<BoatLookupTransferable>> GetBoatsByHostId(Guid? userId) => await _eventManager.GetBoatsByHostId(userId);
        public async Task<EntityResponseModel> SaveEvent(EventRequestable boatEvent) => await _eventManager.SaveEvent(boatEvent);
        public async Task<EntityResponseListModel<EventDTO>> GetEvents(int pageNo, int pageSize) => await _eventManager.GetEvents(CurrentUser.Id, pageNo, pageSize).ConfigureAwait(false);

        public async Task<EntityResponseModel> GetEventById(int eventId)
        {
            return await _eventManager.GetEventById(eventId).ConfigureAwait(false);
        }
        public async Task<bool> UpdateEvent(EventRequestable updatedEvent)
        {
            return await _eventManager.UpdateEvent(updatedEvent, CurrentUser.Id);
        }
        public async Task<bool> UpdateHostEventStatus(long eventId)=>await _eventManager.UpdateEventStatus(eventId).ConfigureAwait(false);

        public async Task<bool> updateEventLocation(EventLocationRequestable events) =>
             await _eventManager.UpdateEventLocation(events, CurrentUser.Id);
        public async Task<EntityResponseListModel<EventDTO>> GetEventsByBoatId(int boatId) =>
            await _eventManager.GetEventsByBoatId(boatId).ConfigureAwait(false);
        public async Task<ICollection<BoatLookupTransferable>> GetAssignedBoats(List<int> Ids)
         => await _eventManager.GetAssignedBoats(Ids).ConfigureAwait(false);

    }
}
