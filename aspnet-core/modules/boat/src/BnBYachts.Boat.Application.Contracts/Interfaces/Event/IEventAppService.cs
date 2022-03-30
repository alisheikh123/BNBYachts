using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Interfaces.Boat
{
    public interface IEventAppService : IApplicationService
    {
        Task<ICollection<BoatLookupTransferable>> GetBoats();
        Task<EntityResponseModel> SaveEvent(EventRequestable boatEvent);
        Task<BoatEventCalendarTransferable> GetBoatBookedDates(int boatId);
        Task<EntityResponseListModel<EventDTO>> GetEvents(int pageNo, int pageSize);
        Task<EntityResponseModel> GetEventById(int eventId);
        Task<bool> UpdateEvent(EventRequestable updatedEvent);
        Task<bool> UpdateHostEventStatus(long eventId);
        Task<bool> updateEventLocation(EventLocationRequestable events);
        Task<ICollection<BoatLookupTransferable>> GetBoatsByHostId(Guid? userId);
        Task<EntityResponseListModel<EventDTO>> GetEventsByBoatId(int boatId);
        Task<ICollection<BoatLookupTransferable>> GetAssignedBoats(List<int> Ids);
    }
}
