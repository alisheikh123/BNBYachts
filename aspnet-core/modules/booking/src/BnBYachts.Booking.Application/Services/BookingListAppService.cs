using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Interfaces;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class BookingListAppService : ApplicationService, IBookingsListAppService
    {
        private readonly IBookingsListManager _bookingManager;
        private readonly ILogger<IBookingsListManager> _logger;
        public BookingListAppService(IBookingsListManager manager, ILogger<IBookingsListManager> logger)
        {
            _bookingManager = manager;
            _logger = logger;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(int serviceType,int pageNo,int pageSize) => await _bookingManager.GetBookedServices(CurrentUser.Id, serviceType,pageNo,pageSize).ConfigureAwait(false);

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(string month, string year,int serviceType, int pageNo, int pageSize)
        {
            var res = await _bookingManager.GetBookingsRequests(CurrentUser.Id, month, year,serviceType,pageNo,pageSize).ConfigureAwait(false);
            _logger.LogInformation("");
            return res;
        }

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices() => await _bookingManager.GetDroppedServices(CurrentUser.Id).ConfigureAwait(false);

        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted,string rejectionReason, int serviceType) => await _bookingManager.UpdateReservationStatus(bookingId, isAccpeted,rejectionReason,serviceType).ConfigureAwait(false);

    }
}
