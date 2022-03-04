using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces.Event
{
    public interface IEventBookingManager
    {
        Task<EntityResponseModel> EventBookingDetailById(long eventId);
        Task CancelEventBooking(BookingCancellationRequestableDto eventBookingCancellationRequestable);
        Task<EntityResponseModel> BookingCancelDetail(long bookingId);
        Task ModifyEventBooking(EventBookingRequestableDto data);
        Task ModifyEventBookingRefundable(BookingRefundableRequestable data, Guid? userId);
    }
}
