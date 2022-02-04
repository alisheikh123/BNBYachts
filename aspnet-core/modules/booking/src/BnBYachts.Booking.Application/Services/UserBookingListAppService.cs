using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Booking.Interfaces;
using Volo.Abp.Uow;
using BnBYachts.Booking.Booking.Requestable;

namespace BnBYachts.Booking.Services
{
    public class UserBookingListAppService : ApplicationService, IUserBookingListAppService
    {
        private readonly IUserBookingListManager _userListManager;
        private readonly ILogger<IUserBookingListManager> _logger;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public UserBookingListAppService(IUserBookingListManager userListManager,ILogger<IUserBookingListManager> logger, IUnitOfWorkManager unitOfWorkManager)
        {
            _userListManager = userListManager;
            _logger = logger;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetBoatelBookings(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res =  await _userListManager.GetBoatelBookings(param).ConfigureAwait(false);
            var logInfo = new { userId=param.UserId,RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Show all Boatel Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;

        }
        public async Task<EntityResponseListModel<CharterBookingTransferableDto>> GetCharterBookings(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _userListManager.GetCharterBookings(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Show all Charter Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;

        }
        public async Task<EntityResponseListModel<EventBookingTransferableDto>> GetEventBookings(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _userListManager.GetEventBookings(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Show all Event Reservation against this userId and Request {@logInfo}", logInfo);
            return res;

        }

        public async Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId)
        => await _userListManager.GetBoatelBooking(bookingId).ConfigureAwait(false);

        public async Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings()
        => await _userListManager.GetHostBoatelBookings(CurrentUser.Id.ToString()).ConfigureAwait(false);

        public async Task<EntityResponseListModel<BookingsLookupDto>> GetMyBookings() => await _userListManager.GetMyBookings(CurrentUser.Id).ConfigureAwait(false);
    }
}
