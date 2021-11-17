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
        private readonly IRepository<BoatelBooking, Guid> _boatelBookingRepository;

        public HostBookingService(IRepository<BoatelBooking, Guid> boatelBookingRepository)
        {
            _boatelBookingRepository = boatelBookingRepository;
        }

        [HttpGet]
        [Route("get-my-reservations")]
        public async Task<List<BoatelBooking>> GetHostBookings()
        {
            var boatelBookings = await _boatelBookingRepository.GetListAsync(res=>res.HostId == CurrentUser.Id.ToString()).ConfigureAwait(false);
            return boatelBookings;
        }
    }
}
