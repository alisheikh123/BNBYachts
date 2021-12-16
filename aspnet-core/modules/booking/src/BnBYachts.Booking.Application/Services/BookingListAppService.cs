using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Interfaces;
using System.Collections.Generic;
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
        public async Task<ICollection<BookingRequestsDto>> GetBookedServices(int serviceType) => await _bookingManager.GetBookedServices(CurrentUser.Id, serviceType).ConfigureAwait(false);

        public async Task<ICollection<BookingRequestsDto>> GetBookingsRequests(string month,string year) => await _bookingManager.GetBookingsRequests(CurrentUser.Id,month,year).ConfigureAwait(false);

        public async Task<ICollection<BookingRequestsDto>> GetDroppedServices() => await _bookingManager.GetDroppedServices(CurrentUser.Id).ConfigureAwait(false);

        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted) => await _bookingManager.UpdateReservationStatus(bookingId, isAccpeted).ConfigureAwait(false);

    }
}
