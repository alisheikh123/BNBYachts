using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
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
        private readonly EventBusDispatcher _eventBusDispatcher;

        public HostBookingService(IRepository<BoatelBookingEntity, int> boatelBookingRepository, EventBusDispatcher eventBusDispatcher)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _eventBusDispatcher = eventBusDispatcher;
        }

        [HttpGet]
        [Route("get-my-reservations")]
        public async Task<List<BoatelBookingEntity>> GetHostBookings(string month, string year)
        {
            if (!string.IsNullOrEmpty(month) || !string.IsNullOrEmpty(year)) 
            {
                var filteredBoatels = await _boatelBookingRepository.GetListAsync(res => res.HostId == CurrentUser.Id.ToString() && res.BookingStatus == BookingStatus.Pending && (res.CheckinDate.Month.ToString() == month && res.CheckinDate.Year.ToString() == year)).ConfigureAwait(false);
                return filteredBoatels;
            }
            var boatelBookings = await _boatelBookingRepository.GetListAsync(res => res.HostId == CurrentUser.Id.ToString() && res.BookingStatus == BookingStatus.Pending).ConfigureAwait(false);
            return boatelBookings;
        }

        [HttpGet]
        [Route("update-reservations-status/{bookingId}/{isAccpeted}")]
        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted)
        {
            var booking = await _boatelBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
            booking.BookingStatus = isAccpeted ? BookingStatus.Approved : BookingStatus.Cancel;

            #region Send-Email
            string body = $"<h4> Your booking has been {booking.BookingStatus}.</h4>";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = booking.UserName,
                Subject = "Email Confirmation",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
            #endregion
            return true;
        }
        [HttpGet]
        [Route("get-my-approve-reservations")]
        public async Task<List<BoatelBookingEntity>> GetApprovedHostBookings()
        {
            var boatelBookings = await _boatelBookingRepository.GetListAsync(res => res.HostId == CurrentUser.Id.ToString() && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false);
            return boatelBookings;
        }
    }
}
