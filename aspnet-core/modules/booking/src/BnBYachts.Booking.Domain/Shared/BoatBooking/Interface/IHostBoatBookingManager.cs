using BnBYachts.Booking.Booking;
using BnBYachts.Booking.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Shared.BoatBooking.Interface
{
    public interface IHostBoatBookingManager
    {
        Task<bool> BoatelBooking(BoatelBookingEntity data, Guid? userId, string userName);
        Task<bool> ModifyBoatelBooking(BoatelBookingDto data, Guid? userId, string userName);
        Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail(string userId);
        Task<ICollection<BoatelBookingEntity>> BoatelBookingDetail(string userId);
        Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail(string userId);

        Task<ICollection<BoatelBookingEntity>> BoatelBooking(int bookingId);
        Task<bool> IsBookingCancel(BookingCancellationDto data, string userId);

    }
}