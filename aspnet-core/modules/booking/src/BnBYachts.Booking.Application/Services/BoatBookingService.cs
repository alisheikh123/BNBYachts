using BnBYachts.Booking.Booking;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

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
        public async Task<bool> BoatelBooking(BoatelBookingEntity data)
        {
            await _hostBoatBookingManager.BoatelBooking(data, CurrentUser.Id, CurrentUser.Name);
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
        public async Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail()
        {
            var bookings = await _hostBoatBookingManager.UpcomingBoatelBookingDetail(CurrentUser.Id.ToString()).ConfigureAwait(false);
            return bookings;
        }
        [HttpGet]
        [Route("pastboatelbookingdetail")]
        public async Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail()
        {

            var pastBooking = await _hostBoatBookingManager.PastBoatelBookingDetail(CurrentUser.Id.ToString()).ConfigureAwait(false);
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
        public async Task<bool> BookingCancel(BookingCancelEntity data)
        {
            var isBookingCancel = await _hostBoatBookingManager.IsBookingCancel(data, CurrentUser.Id.ToString());
            return isBookingCancel;

        }


    }
}