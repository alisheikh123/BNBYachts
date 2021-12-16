using BnBYachts.Booking.Booking.Transferables;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking
{
    public interface IBookingsListAppService:IApplicationService
    {
        Task<ICollection<BookingRequestsDto>> GetBookingsRequests(string month, string year);
        Task<ICollection<BookingRequestsDto>> GetBookedServices(int serviceType);
        Task<ICollection<BookingRequestsDto>> GetDroppedServices();
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted);
    }
}
