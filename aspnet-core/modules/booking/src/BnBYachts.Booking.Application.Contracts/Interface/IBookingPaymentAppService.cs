using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Interface
{
    public interface IBookingPaymentAppService:IApplicationService
    {
        Task<EntityResponseListModel<UnPaidBookingsTransferable>> GetUnPaidBookings();
        Task<EntityResponseModel> SetBookingPaid(ICollection<UnPaidBookingRequestable> data);
    }
}
