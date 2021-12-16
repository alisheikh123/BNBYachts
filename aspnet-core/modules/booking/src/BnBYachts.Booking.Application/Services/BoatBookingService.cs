using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using BnBYachts.Booking.Shared.BoatBooking.Transferable;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class BoatBookingService : ApplicationService
    {
        private readonly IHostBoatBookingManager _hostBoatBookingManager;
        public BoatBookingService(IHostBoatBookingManager hostBoatBookingManager)
        {
            _hostBoatBookingManager = hostBoatBookingManager;
        }

        [HttpPost]
        [Route("boatelbooking")]
        public async Task<BoatelBookingTransferable> BoatelBooking(BoatelBookingEntity data)
        {
            var result = await _hostBoatBookingManager.BoatelBooking(data, CurrentUser.Id, CurrentUser.Email);
            return result;
        }
        [HttpPost]
        [Route("modifyboatelbooking")]
        public async Task<bool> ModifyBoatelBooking(BoatelBookingDto data)
        {
            await _hostBoatBookingManager.ModifyBoatelBooking(data, CurrentUser.Id, CurrentUser.Name);
            return true;
        }
        [HttpGet]
        [Route("boatelbookingdetail")]
        public async Task<ICollection<BoatelBookingEntity>> BoatelBookingDetail()
        {

            var Booking = await _hostBoatBookingManager.BoatelBookingDetail(CurrentUser.Id.ToString());
            return Booking;
        }
        [HttpGet]
        [Route("upcomingboatelbookingdetail")]
        public async Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail(string month, string year)
        {
            var bookings = await _hostBoatBookingManager.UpcomingBoatelBookingDetail(CurrentUser.Id.ToString(),month,year).ConfigureAwait(false);
            return bookings;
        }
        [HttpGet]
        [Route("pastboatelbookingdetail")]
        public async Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail(string month, string year)
        {

            var pastBooking = await _hostBoatBookingManager.PastBoatelBookingDetail(CurrentUser.Id.ToString(),month,year).ConfigureAwait(false);
            return pastBooking;
        }

        [HttpGet]
        [Route("boatelbooking/{bookingId}")]
        public async Task<ICollection<BoatelBookingEntity>> BoatelBooking(int bookingId)
        {
            var Booking = await _hostBoatBookingManager.BoatelBooking(bookingId).ConfigureAwait(false);
            return Booking;
        }

        [HttpPost]
        [Route("bookingcancel")]
        public async Task<bool> BookingCancel(BookingCancellationDto data)
        {
            var isBookingCancel = await _hostBoatBookingManager.IsBookingCancel(data, CurrentUser.Id.ToString());
            return isBookingCancel;


        }
        [HttpGet]
        [Route("getmybookings")]
        public async Task<ICollection<BoatelBookingEntity>> GetMyBookings()
        {
            var myBookings = await _hostBoatBookingManager.GetMyBookings(CurrentUser.Id.ToString());
            return myBookings;
        }

        [HttpGet]
        [Route("upcominghostboatelbookingdetail")]
        public async Task<ICollection<BoatelBookingEntity>> UpcomingHostBoatelBookingDetail()
        {
            var bookings = await _hostBoatBookingManager.UpcomingHostBoatelBookingDetail(CurrentUser.Id.ToString()).ConfigureAwait(false);
            return bookings;
        }
        public async Task<ICollection<BoatelBookingEntity>> GetDroppedServices()
        {

            var Booking = await _hostBoatBookingManager.BoatelBookingDetail(CurrentUser.Id.ToString());
            return Booking;
        }
    }
}