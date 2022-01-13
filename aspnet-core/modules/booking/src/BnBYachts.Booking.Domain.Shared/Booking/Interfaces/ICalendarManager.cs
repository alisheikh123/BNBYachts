using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces
{
    public interface ICalendarManager
    {
        Task<EntityResponseListModel<BookingCalendarTransferable>> GetBookings(string hostId);
    }
}
