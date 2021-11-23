using BnBYachts.Booking.Booking;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Emailing;
using Volo.Abp.Emailing.Templates;
using Volo.Abp.Identity;
using Volo.Abp.TextTemplating;

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
        [HttpGet]
        [Route("boatelbookingdetail")]
        public async Task<dynamic> BoatelBookingDetail()
        {
             
            var Booking = _boatelBookingRepository.Where(x => x.UserId == CurrentUser.Id.ToString() && x.CheckinDate == DateTime.Today).ToList();
            return Booking;
        }
        [HttpGet]
        [Route("upcomingboatelbookingdetail/{userId}")]
        public async Task<dynamic> UpcomingBoatelBookingDetail(string userId, string upcoming)
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

        [HttpPost]
        [Route("bookingcancel")]
        public async Task<bool> BookingCancel(BookingCancellationDto data)
        {

            if (data != null)
            {
                BookingCancelled model = new BookingCancelled();
                var BookingDetail = await _boatelBookingRepository.GetAsync(data.BookingId);
                string from = "ali.raza@techverx.com";
                string to = "alisheikh14125@gmail.com";
                var admin = new MailAddress(from, "BNBYechet");
                var toAddress = new MailAddress(to, "Ali");
                const string adminPass = "Alisheikh@123";
                const string subject = "Your Booking is Cancelled!";
                string body =
                    "Your Booking is Cancelled From BNByachts";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(admin.Address, adminPass)
                };
                using (var message = new MailMessage(admin, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }

                model.BookingId = data.BookingId.ToString();
                BookingDetail.BookingStatus = data.BookingStatus;
                model.BookingType = data.BookingType;
                model.isNotificationSent = data.isNotificationSent;
                model.Reason = data.Reason;
                model.UserId = data.UserId;
                model.RefundAmount = data.RefundAmount;
                model.TotalAmount = data.TotalAmount;
                await _bookingCancelRepository.InsertAsync(model);
                return true;
            }
            return false;
        }
     

    }
}
