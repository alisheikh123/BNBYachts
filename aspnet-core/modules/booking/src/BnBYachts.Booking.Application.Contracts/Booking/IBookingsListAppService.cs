using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking
{
    public interface IBookingsListAppService:IApplicationService
    {
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersRequests(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsRequests(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersBookedServices(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsBookedServices(EntityBookingParamsDto param);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices();
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted, string rejectionReason,int serviceType);
    }
}
