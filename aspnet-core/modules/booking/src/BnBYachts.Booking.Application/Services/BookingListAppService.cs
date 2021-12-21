using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Interfaces;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class BookingListAppService : ApplicationService, IBookingsListAppService
    {
        private readonly IBookingsListManager _bookingManager;
        public BookingListAppService(IBookingsListManager manager)
        {
            _bookingManager = manager;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(int serviceType) => await _bookingManager.GetBookedServices(CurrentUser.Id, serviceType).ConfigureAwait(false);

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(string month, string year,int serviceType)
        {
            var res = await _bookingManager.GetBookingsRequests(CurrentUser.Id, month, year,serviceType).ConfigureAwait(false);
            return res;
        }

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices() => await _bookingManager.GetDroppedServices(CurrentUser.Id).ConfigureAwait(false);

        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted,string rejectionReason) => await _bookingManager.UpdateReservationStatus(bookingId, isAccpeted,rejectionReason).ConfigureAwait(false);

    }
}
