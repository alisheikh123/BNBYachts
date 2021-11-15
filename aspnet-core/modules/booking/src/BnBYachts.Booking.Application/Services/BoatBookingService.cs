using BnBYachts.Booking.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
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
        [HttpGet]
        [Route("boatelbookingdetail/{userId}")]
        public async Task<dynamic> BoatelBookingDetail(string userId)
        {
          var Booking = _boatelBookingRepository.Where(x => x.UserId == userId && x.CheckinDate == DateTime.Today).ToList();
          return Booking;
        }
        [HttpGet]
        [Route("upcomingboatelbookingdetail/{userId}")]
        public async Task<dynamic> UpcomingBoatelBookingDetail(string userId,string upcoming)
        {
                var upcomingBooking = _boatelBookingRepository.Where(x => x.UserId == userId && x.CheckinDate > DateTime.Today).ToList();
                return upcomingBooking;
        }
        [HttpGet]
        [Route("pastboatelbookingdetail/{userId}")]
        public async Task<dynamic> PastBoatelBookingDetail(string userId, string past)
        {
                var pastBooking = _boatelBookingRepository.Where(x => x.UserId == userId && x.CheckinDate < DateTime.Today).ToList();
                return pastBooking;
        }

        [HttpGet]
        [Route("boatelbooking/{bookingId}")]
        public async Task<dynamic> BoatelBooking(Guid bookingId)
        {
            var Booking = _boatelBookingRepository.Where(x => x.Id == bookingId).ToList();
            return Booking;
        }

    }
}
