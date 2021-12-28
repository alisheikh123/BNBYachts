using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking
{
    public interface IBoatBookingService : IApplicationService
    {
        Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data);
        Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data);
        Task<EntityResponseModel> EventBooking(EventBookingRequestableDto data);
        Task<bool> ModifyBoatelBooking(BookingRequestsRequestableDto data);

        Task<EntityResponseModel> GetBookingCancellationDetail(long bookingId);
    }
}
