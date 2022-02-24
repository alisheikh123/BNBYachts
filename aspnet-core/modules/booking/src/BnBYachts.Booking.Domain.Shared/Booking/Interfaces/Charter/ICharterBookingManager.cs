using BnBYachts.Booking.Booking.Requestable.Charter;
using BnBYachts.Booking.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces.Charter
{
    public interface ICharterBookingManager
    {
        Task<CharterBookingRequestable> GetCharterBookingById(long charterBookingId);
        Task CancelCharterBooking(BookingCancellationRequestableDto chartercancellationRequestable);

    }
}
