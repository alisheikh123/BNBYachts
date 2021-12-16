using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interfaces
{
   public interface IBookingsListManager
    {
        Task<EntityResponseListModel<BookingRequestsDto>> GetBookingsRequests(Guid? userId, string month, string year);
        Task<EntityResponseListModel<BookingRequestsDto>> GetBookedServices(Guid? userId,int serviceType);
        Task<EntityResponseListModel<BookingRequestsDto>> GetDroppedServices(Guid? userId);
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted);
    }
}
