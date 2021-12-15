using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Interfaces.Boat
{
    public interface IEventAppService : IApplicationService
    {
        Task<ICollection<BoatLookupTransferable>> GetBoats();
        Task<bool> SaveEvent(EventRequestable boatEvent);
        Task<BoatEventCalendarTransferable> GetBoatBookedDates(int boatId);

        Task<ICollection<EventDTO>> GetEvents();
    }
}
