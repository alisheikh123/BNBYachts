using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces
{
    public interface IBookingCalendarManager
    {
        Task<EntityResponseListModel<CalendarTransferable>> GetBoatelBookings(Guid? userId);
        Task<EntityResponseListModel<CalendarTransferable>> GetCharterBookings(Guid? userId);
        Task<EntityResponseListModel<CalendarTransferable>> GetEventBookings(Guid? userId);
        Task<EntityResponseModel> GetBoatBookingCalendar(string hostId, int month, int boatId);
    }
}
