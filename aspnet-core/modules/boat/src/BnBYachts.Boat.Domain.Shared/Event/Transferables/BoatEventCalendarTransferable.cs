using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Event.Transferables
{
   public class BoatEventCalendarTransferable
    {
        public List<DateTime> BookedDates { get; set; }
        public BoatEventCalendarTransferable()
        {
            BookedDates = new List<DateTime>();
        }
    }
}
