using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class BoatBookingService : ApplicationService, IBoatBookingService
    {
        private readonly IBoatBookingManager _hostBoatBookingManager;
        public BoatBookingService(IBoatBookingManager hostBoatBookingManager)
        {
            _hostBoatBookingManager = hostBoatBookingManager;
        }

        public async Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data) =>
            await _hostBoatBookingManager.BoatelBooking(data, CurrentUser.Id, CurrentUser.Name, CurrentUser.Email);

        public async Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data) =>
            await _hostBoatBookingManager.CharterBooking(data, CurrentUser.Id, CurrentUser.Name, CurrentUser.Email);
        public async Task<EntityResponseModel> EventBooking(EventBookingRequestableDto data) =>
            await _hostBoatBookingManager.EventBooking(data, CurrentUser.Id, CurrentUser.Name, CurrentUser.Email);

        public async Task ModifyBoatelBooking(BookingRequestsRequestableDto data)=>
            await _hostBoatBookingManager.ModifyBoatelBooking(data, CurrentUser.Id, CurrentUser.Name);
        

        public async Task<bool> BookingCancel(BookingCancellationRequestableDto data)=>
            await _hostBoatBookingManager.IsBookingCancel(data, CurrentUser.Id.ToString());
        public async Task<EntityResponseModel> GetBookingCancellationDetail(long bookingId)=>
            await _hostBoatBookingManager.GetBookingCancellationDetail(bookingId, CurrentUser.Id);
        
    }
}