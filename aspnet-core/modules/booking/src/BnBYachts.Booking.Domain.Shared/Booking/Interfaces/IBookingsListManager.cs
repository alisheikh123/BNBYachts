using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interfaces
{
   public interface IBookingsListManager
    {
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersRequests(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsRequests(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersBookedServices(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsBookedServices(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices(Guid? userId);
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted, string rejectionReason, int serviceType);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetMyBookings(int boatId,Guid? userId);
    }
}
