using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class BoatCalendarTransferableDTO
    {
        public List<DateTime> BookedDates { get; set; }
        public BoatCalendarTransferableDTO()
        {
             BookedDates = new List<DateTime>();
        }
    }
}
