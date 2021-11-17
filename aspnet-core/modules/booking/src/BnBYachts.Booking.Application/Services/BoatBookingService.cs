﻿using BnBYachts.Booking.DTO;
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
    public class BoatBookingService : CrudAppService<BoatelBookingEntity, BoatelBookingDto, int, PagedAndSortedResultRequestDto, BoatelBookingDto>, IBoatBookingService
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        public BoatBookingService(IRepository<BoatelBookingEntity, int> repository)
          : base(repository)
        {
            _boatelBookingRepository = repository;
        }

        [HttpPost]
        [Route("boatelbooking")]
        public async Task<bool> BoatelBooking(BoatelBookingEntity data)
        {
            data.LastModifierId = data.CreatorId = CurrentUser.Id;
            data.UserId = CurrentUser.Id.ToString();
            await _boatelBookingRepository.InsertAsync(data);
            return true;
        }

    }
}
