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
            await _hostBoatBookingManager.BoatelBooking(data, CurrentUser.Id,CurrentUser.Name);
            return true;
        }

    }
}
