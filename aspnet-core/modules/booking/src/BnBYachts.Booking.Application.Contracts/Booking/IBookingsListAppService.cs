using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking
{
    public interface IBookingsListAppService:IApplicationService
    {
        Task<EntityResponseListModel<BookingRequestsDto>> GetBookingsRequests(string month, string year);
        Task<EntityResponseListModel<BookingRequestsDto>> GetBookedServices(int serviceType);
        Task<EntityResponseListModel<BookingRequestsDto>> GetDroppedServices();
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted);
    }
}
