using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Booking.Interfaces;

namespace BnBYachts.Booking.Services
{
    public class UserBookingListAppService : ApplicationService, IUserBookingListAppService
    {
        private readonly IUserBookingListManager _userListManager;
        private readonly ILogger<IUserBookingListManager> _logger;
        public UserBookingListAppService(IUserBookingListManager userListManager,ILogger<IUserBookingListManager> logger)
        {
            _userListManager = userListManager;
            _logger = logger;
        }

        public async Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter, BookingType bookingType, string month, string year,int pageNo, int pageSize)
        {
            var res =  await _userListManager.GetBoatelBookings(filter, bookingType, CurrentUser.Id, month, year, pageNo, pageSize).ConfigureAwait(false);
            _logger.LogInformation("");
            return res;

        }
        public async Task<EntityResponseListModel<CharterBookingTransferableDto>> GetCharterBookings(BookingResponseFilter filter, BookingType bookingType, string month, string year, int pageNo, int pageSize)
        {
            var res = await _userListManager.GetCharterBookings(filter, bookingType, CurrentUser.Id, month, year, pageNo, pageSize).ConfigureAwait(false);
            _logger.LogInformation("");
            return res;

        }
        public async Task<EntityResponseListModel<EventBookingTransferableDto>> GetEventBookings(BookingResponseFilter filter, BookingType bookingType, string month, string year, int pageNo, int pageSize)
        {
            var res = await _userListManager.GetEventBookings(filter, bookingType, CurrentUser.Id, month, year, pageNo, pageSize).ConfigureAwait(false);
            _logger.LogInformation("");
            return res;

        }

        public async Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId)
        => await _userListManager.GetBoatelBooking(bookingId).ConfigureAwait(false);

        public async Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings()
        => await _userListManager.GetHostBoatelBookings(CurrentUser.Id.ToString()).ConfigureAwait(false);
    }
}
