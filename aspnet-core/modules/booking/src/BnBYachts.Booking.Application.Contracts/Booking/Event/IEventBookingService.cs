using BnBYachts.Booking.DTO;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Booking.Event
{
   public interface IEventBookingService:IApplicationService
    {
        Task<EntityResponseModel> GetEventBookingDetailById(long eventBookingId);
        Task CancelEventBooking(BookingCancellationRequestableDto eventBookingCancellationRequestable);
        Task<EntityResponseModel> BookingCancelDetail(long bookingId);
    }
}
