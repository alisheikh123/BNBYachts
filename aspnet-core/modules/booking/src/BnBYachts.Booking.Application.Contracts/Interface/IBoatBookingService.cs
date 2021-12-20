using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Interface
{
   public interface IBoatBookingService:IApplicationService
    {
        Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data, Guid? userId, string userName);
        Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data, Guid? userId, string email);
        Task<bool> ModifyBoatelBooking(BookingRequestsRequestableDto data, Guid? userId, string userName);
    }
}
