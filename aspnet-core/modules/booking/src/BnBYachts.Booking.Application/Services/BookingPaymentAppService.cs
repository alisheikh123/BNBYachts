using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Interface;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    [Authorize]
    public class BookingPaymentAppService : ApplicationService, IBookingPaymentAppService
    {
        private readonly IBookingPaymentManager _manager;
        public BookingPaymentAppService(IBookingPaymentManager manager)
        {
            _manager = manager;
        }
        public async Task<EntityResponseListModel<UnPaidBookingsTransferable>> GetUnPaidBookings()
        => await _manager.GetUnPaidBookings(CurrentUser.Id.ToString()).ConfigureAwait(false);

        public async Task<EntityResponseModel> SetBookingPaid(ICollection<UnPaidBookingRequestable> data)
        => await _manager.SetBookingPaid(data).ConfigureAwait(false);
    }
}
