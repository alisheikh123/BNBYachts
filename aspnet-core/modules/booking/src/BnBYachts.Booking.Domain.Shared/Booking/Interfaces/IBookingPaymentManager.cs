using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces
{
    public interface IBookingPaymentManager
    {
        Task<EntityResponseListModel<UnPaidBookingsTransferable>> GetUnPaidBookings(string userId);
        Task<EntityResponseModel> SetBookingPaid(ICollection<UnPaidBookingRequestable> data);
    }
}
