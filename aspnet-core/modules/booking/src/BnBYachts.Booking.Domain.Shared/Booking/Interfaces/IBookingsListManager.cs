using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interfaces
{
   public interface IBookingsListManager
    {
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(Guid? userId, string month, string year, int serviceType);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(Guid? userId,int serviceType);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices(Guid? userId);
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted, string rejectionReason);
    }
}
