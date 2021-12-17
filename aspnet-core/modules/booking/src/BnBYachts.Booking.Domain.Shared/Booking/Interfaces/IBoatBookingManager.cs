
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Shared.Model;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Shared.BoatBooking.Interface
{
    public interface IBoatBookingManager
    {
        Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data, Guid? userId, string userName);
        Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data, Guid? userId, string email);
        Task<EntityResponseModel> EventBooking(EventBookingRequestableDto data, Guid? userId, string email);
        Task<bool> ModifyBoatelBooking(BookingRequestsRequestableDto data, Guid? userId, string userName);
        Task<bool> IsBookingCancel(BookingCancellationRequestableDto data, string userId);
        //Task<bool> ModifyBoatelBooking(BoatelBookingDto data, Guid? userId, string userName);
        //Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail(string userId,string month, string year);
        //Task<ICollection<BoatelBookingEntity>> BoatelBookingDetail(string userId);
        //Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail(string userId, string month, string year);

        //Task<ICollection<BoatelBookingEntity>> BoatelBooking(int bookingId);
        //Task<bool> IsBookingCancel(BookingCancellationDto data, string userId);
        //Task<ICollection<BoatelBookingEntity>> GetMyBookings(string userId);
        //Task<ICollection<BoatelBookingEntity>> UpcomingHostBoatelBookingDetail(string userId);

    }
}