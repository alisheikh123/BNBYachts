using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Booking.Interfaces
{
    public interface IUserBookingListManager
    {
        Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetBoatelBookings(EntityBookingParamsDto param);
        Task<EntityResponseListModel<CharterBookingTransferableDto>> GetCharterBookings(EntityBookingParamsDto param);
        Task<EntityResponseListModel<EventBookingTransferableDto>> GetEventBookings(EntityBookingParamsDto param);
        Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId);
        Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings(string userId);
        Task<EntityResponseListModel<BookingsLookupDto>> GetMyBookings(Guid? userId);
    }
}
