using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Event.Transferables
{
   public class BoatEventCalendarTransferable
    {
        public ICollection<DateTime> BookedDates { get; set; }
        public BoatEventCalendarTransferable()
        {
            BookedDates = new HashSet<DateTime>();
        }
    }
}
