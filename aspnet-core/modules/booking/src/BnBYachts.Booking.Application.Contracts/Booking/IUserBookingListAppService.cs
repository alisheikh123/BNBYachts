using BnBYachts.Booking.Booking.Transferables;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking
{
    public interface IUserBookingListAppService:IApplicationService
    {
        Task<ICollection<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter, string month, string year);
        Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId);
        Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings();
    }
}
