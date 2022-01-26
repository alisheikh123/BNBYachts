using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Transferables
{
    public class BookingCalendarTransferable : ITransferable
    {
        public ICollection<CalendarTransferable> Boatels { get; set; }
        public ICollection<CalendarTransferable> Charters { get; set; }
        public ICollection<CalendarTransferable> Events { get; set; }
        public BookingCalendarTransferable()
        {
            Boatels = new HashSet<CalendarTransferable>();
            Charters = new HashSet<CalendarTransferable>();
            Events = new HashSet<CalendarTransferable>();
        }
    }
    public class CalendarTransferable
    {
        public int Id { get; set; }
        public int? BookingId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ServiceType { get; set; }
        public string UserId { get; set; }
    }
}
