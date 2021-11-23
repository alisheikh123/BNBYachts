using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Booking.Services
{
    public class HostBookingService : ApplicationService
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;

        public HostBookingService(IRepository<BoatelBookingEntity, int> boatelBookingRepository)
        {
            _boatelBookingRepository = boatelBookingRepository;
        }

        [HttpGet]
        [Route("get-my-reservations")]
        public async Task<List<BoatelBookingEntity>> GetHostBookings()
        {
            var boatelBookings = await _boatelBookingRepository.GetListAsync(res=>res.HostId == CurrentUser.Id.ToString() && res.BookingStatus == BookingStatus.Pending).ConfigureAwait(false);
            return boatelBookings;
        }

        [HttpGet]
        [Route("update-reservations-status/{bookingId}/{isAccpeted}")]
        public async Task<bool> UpdateReservationStatus(int bookingId,bool isAccpeted)
        {
            var booking = await _boatelBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
            booking.BookingStatus = isAccpeted ? BookingStatus.Approved : BookingStatus.CancelApproved;
            return true;
        }
    }
}
