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
            var boatelBookings = await _boatelBookingRepository.GetListAsync(res=>res.HostId == CurrentUser.Id.ToString()).ConfigureAwait(false);
            return boatelBookings;
        }
    }
}
