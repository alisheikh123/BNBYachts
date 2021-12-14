using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Boat.Interfaces.Boat;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<bool> SaveEvent(EventRequestable boatEvent) => await _eventManager.SaveEvent(boatEvent);

    }
}
