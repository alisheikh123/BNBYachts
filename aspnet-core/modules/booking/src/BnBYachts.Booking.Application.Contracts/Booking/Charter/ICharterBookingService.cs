using BnBYachts.Booking.Booking.Requestable.Charter;
using BnBYachts.Booking.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking.Charter
{
    public interface ICharterBookingService: IApplicationService
    {
        Task<CharterBookingRequestable> GetCharterBookingDetailById(long charterBookingId);
        Task CancelCharterBooking(BookingCancellationRequestableDto charterBookingCancellationRequestable);
    }
}
