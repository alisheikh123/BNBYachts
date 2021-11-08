using BnBYachts.Booking.DTO;
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
    public class BoatBookingService : CrudAppService<BoatelBooking, BoatelBookingDto, Guid, PagedAndSortedResultRequestDto, BoatelBookingDto>, IBoatBookingService
    {
        private readonly IRepository<BoatelBooking, Guid> _boatelBookingRepository;
        public BoatBookingService(IRepository<BoatelBooking, Guid> repository)
          : base(repository)
        {
            _boatelBookingRepository = repository;
        }

        [HttpPost]
        [Route("boatelbooking")]
        public async Task<bool> BoatelBooking(BoatelBooking data)
        {
            await _boatelBookingRepository.InsertAsync(data);
            return true;
        }

    }
}
