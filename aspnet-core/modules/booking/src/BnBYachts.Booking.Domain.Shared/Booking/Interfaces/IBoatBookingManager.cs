
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Shared.Model;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Shared.BoatBooking.Interface
{
    public interface IBoatBookingManager
    {
        Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data, Guid? userId, string userName,string email);
        Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data, Guid? userId, string userName, string email);
        Task<EntityResponseModel> EventBooking(EventBookingRequestableDto data, Guid? userId, string userName, string email);
        Task<EntityResponseModel> GetBookingCancellationDetail(long bookingId, Guid? userId);
        Task ModifyBoatelBooking(BookingRequestsRequestableDto data, Guid? userId, string userName);
        Task<bool> IsBookingCancel(BookingCancellationRequestableDto data, string userId);

    }
}