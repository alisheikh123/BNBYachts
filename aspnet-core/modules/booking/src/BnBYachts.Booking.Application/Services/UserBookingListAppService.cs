using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class UserBookingListAppService : ApplicationService, IUserBookingListAppService
    {
        private readonly IUserBookingListManager _userListManager;
        public UserBookingListAppService(IUserBookingListManager userListManager)
        {
            _userListManager = userListManager;
        }

        public async Task<ICollection<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter, string month, string year)
        {
            return await _userListManager.GetBoatelBookings(filter, CurrentUser.Id, month, year).ConfigureAwait(false);
        }

        public async Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId)
        => await _userListManager.GetBoatelBooking(bookingId).ConfigureAwait(false);

        public async Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings()
        => await _userListManager.GetHostBoatelBookings(CurrentUser.Id.ToString()).ConfigureAwait(false);
    }
}
