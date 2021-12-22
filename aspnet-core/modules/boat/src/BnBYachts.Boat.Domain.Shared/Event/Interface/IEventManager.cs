using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Boat.Interfaces
{
   public interface IEventManager
    {
        Task<ICollection<BoatLookupTransferable>> GetBoats(Guid? userId);
        Task<bool> SaveEvent(EventRequestable boatEvent);
        Task<BoatEventCalendarTransferable> GetBoatBookedDates(int boatId);
        Task<EntityResponseListModel<EventDTO>> GetEvents(Guid? userId, int pageNo, int pageSize);
    }
}
