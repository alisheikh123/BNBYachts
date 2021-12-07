using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Transferable;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Shared.BoatBooking.Interface
{
    public interface IHostBoatBookingManager
    {
        Task<BoatelBookingTransferable> BoatelBooking(BoatelBookingEntity data, Guid? userId, string userName);
        Task<bool> ModifyBoatelBooking(BoatelBookingDto data, Guid? userId, string userName);
        Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail(string userId,string month, string year);
        Task<ICollection<BoatelBookingEntity>> BoatelBookingDetail(string userId);
        Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail(string userId, string month, string year);

        Task<ICollection<BoatelBookingEntity>> BoatelBooking(int bookingId);
        Task<bool> IsBookingCancel(BookingCancellationDto data, string userId);
        Task<ICollection<BoatelBookingEntity>> GetMyBookings(string userId);
        Task<ICollection<BoatelBookingEntity>> UpcomingHostBoatelBookingDetail(string userId);

    }
}