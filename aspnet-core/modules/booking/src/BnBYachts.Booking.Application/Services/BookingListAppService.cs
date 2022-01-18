using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Interfaces;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Uow;

namespace BnBYachts.Booking.Services
{
    public class BookingListAppService : ApplicationService, IBookingsListAppService
    {
        private readonly IBookingsListManager _bookingManager;
        private readonly ILogger<IBookingsListManager> _logger;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public BookingListAppService(IBookingsListManager manager, ILogger<IBookingsListManager> logger, IUnitOfWorkManager unitOfWorkManager)
        {
            _bookingManager = manager;
            _logger = logger;
            _unitOfWorkManager = unitOfWorkManager;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _bookingManager.GetBookedServices(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Get all Host Boatel Booked Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;
        } 
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersBookedServices(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _bookingManager.GetChartersBookedServices(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Get all Host Charter  Booked Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;
        } 
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsBookedServices(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _bookingManager.GetEventsBookedServices(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Get all Host Event Booked Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;
        }

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _bookingManager.GetBookingsRequests(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Get all Host Boatel Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersRequests(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _bookingManager.GetChartersRequests(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Get all Charter Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsRequests(EntityBookingParamsDto param)
        {
            param.UserId = CurrentUser.Id;
            var res = await _bookingManager.GetEventsRequests(param).ConfigureAwait(false);
            var logInfo = new { userId = param.UserId, RequestId = _unitOfWorkManager.Current.Id };
            _logger.LogInformation("Get all Events Reservation against this userId and Request  {@logInfo}", logInfo);
            return res;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices() => await _bookingManager.GetDroppedServices(CurrentUser.Id).ConfigureAwait(false);

        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted,string rejectionReason, int serviceType) => await _bookingManager.UpdateReservationStatus(bookingId, isAccpeted,rejectionReason,serviceType).ConfigureAwait(false);
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetMyBookings(int boatId)
        {
            var res = await _bookingManager.GetMyBookings(boatId,CurrentUser.Id).ConfigureAwait(false);
            _logger.LogInformation("Bookings Get Request");
            return res;
        }

    }
}
