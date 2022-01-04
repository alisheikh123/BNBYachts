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
        Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter,BookingType bookingType, Guid? userId, string month, string year, int pageNo, int pageSize);
        Task<EntityResponseListModel<CharterBookingTransferableDto>> GetCharterBookings(BookingResponseFilter filter,BookingType bookingType, Guid? userId, string month, string year, int pageNo, int pageSize);
        Task<EntityResponseListModel<EventBookingTransferableDto>> GetEventBookings(BookingResponseFilter filter,BookingType bookingType, Guid? userId, string month, string year, int pageNo, int pageSize);
        Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId);
        Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings(string userId);
    }
}
