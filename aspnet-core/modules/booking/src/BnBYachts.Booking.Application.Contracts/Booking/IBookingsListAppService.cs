using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking
{
    public interface IBookingsListAppService:IApplicationService
    {
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(string month, string year, int serviceType, int pageNo, int pageSize);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(int serviceType,int pageNo,int pageSize);
        Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices();
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted, string rejectionReason,int serviceType);
    }
}
