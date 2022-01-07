using BnBYachts.Boat.Boat.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class BoatCalendarTransferable
    {
        public ICollection<CalendarTransferable> Boatels { get; set; }
        public ICollection<CalendarTransferable> Charters { get; set; }
        public ICollection<CalendarTransferable> Events { get; set; }
        public BoatCalendarTransferable()
        {
            Boatels = new HashSet<CalendarTransferable>();
            Charters = new HashSet<CalendarTransferable>();
            Events = new HashSet<CalendarTransferable>();
        }
    }
    public class CalendarTransferable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ServiceType ServiceType { get; set; }
    }
}
