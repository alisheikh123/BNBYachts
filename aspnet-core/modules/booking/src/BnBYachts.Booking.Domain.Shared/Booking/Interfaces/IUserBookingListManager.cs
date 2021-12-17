using BnBYachts.Booking.Booking.Transferables;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces
{
    public interface IUserBookingListManager
    {
        Task<ICollection<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter, Guid? userId, string month, string year);
        Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId);
        Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings(string userId);
    }
}
