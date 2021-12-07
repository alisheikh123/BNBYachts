using BnBYachts.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Transferable
{
    public class EventDetailTransferable
    {
        public EventEntity  eventDetails { get; set; }
        public ICollection<EventSchedule> eventSchedule { get; set; }
    }


    public class EventSchedule
    {
        public DateTime EventDate { get; set; }
        public int EventId { get; set; }
    }
}
