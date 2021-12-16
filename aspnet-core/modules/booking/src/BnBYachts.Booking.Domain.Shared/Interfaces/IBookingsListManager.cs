using BnBYachts.Booking.Booking.Transferables;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interfaces
{
   public interface IBookingsListManager
    {
        Task<ICollection<BookingRequestsDto>> GetBookingsRequests(Guid? userId, string month, string year);
        Task<ICollection<BookingRequestsDto>> GetBookedServices(Guid? userId,int serviceType);
        Task<ICollection<BookingRequestsDto>> GetDroppedServices(Guid? userId);
        Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted);
    }
}
