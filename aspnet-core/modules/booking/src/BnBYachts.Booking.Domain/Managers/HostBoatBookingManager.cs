using BnBYachts.Booking.Booking;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Booking.Managers
{
    public class HostBoatBookingManager : DomainService, IHostBoatBookingManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<BookingCancelEntity, int> _boatelCanceRepository;
        public HostBoatBookingManager(IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
        }

        public async Task<bool> BoatelBooking(BoatelBookingEntity data, Guid? userId, string userName)
        {
            data.LastModifierId = data.CreatorId = userId;
            data.UserId = userId.ToString();
            data.UserName = userName;
            var response = await _boatelBookingRepository.InsertAsync(data).ConfigureAwait(false);
            if (response.Id > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<bool> ModifyBoatelBooking(BoatelBookingDto data, Guid? userId, string userName)
        {
         
            var booking = await _boatelBookingRepository.GetAsync(data.Id);
            if (booking != null)
            {
                booking.CheckinDate = data.CheckinDate;
                booking.CheckoutDate = data.CheckoutDate;
                booking.NoOfAdults = data.NoOfAdults;
                booking.NoOfChildrens = data.NoOfChildrens;
                booking.BoatId = data.BoatId;
                booking.BookingStatus = data.BookingStatus;
                booking.PaymentStatus = data.PaymentStatus;
                booking.LastModificationTime = DateTime.Now;
                booking.LastModifierId = userId;
                booking.UserName = userName;

                return true;
            }
            else
            {
                return false;
            }
            
          
        }



        public async Task<ICollection<BoatelBookingEntity>> BoatelBookingDetail(string userId)
        {
            var Booking = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate == DateTime.Today).ConfigureAwait(false);
            return Booking;
        }

        public async Task<ICollection<BoatelBookingEntity>> BoatelBooking(int bookingId)
        {
            var booking = await _boatelBookingRepository.GetListAsync(x => x.Id == bookingId).ConfigureAwait(false);
            return booking;
        }

        public async Task<bool> IsBookingCancel(BookingCancellationDto data, string userId)
        {
            if (data != null)
            {
                BookingCancelEntity model = new BookingCancelEntity();
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
                BookingDetail.BookingStatus = BookingStatus.Cancel;
                await _boatelCanceRepository.InsertAsync(model);
                return true;
            }
            return false;
        }



        public async Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail(string userId)
        {
            var pastBooking = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate < DateTime.Today).ConfigureAwait(false);
            return pastBooking;
        }



        public async Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail(string userId)
        {
            var upcomingBookings = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate > DateTime.Today).ConfigureAwait(false);
            return upcomingBookings;
        }

       
    }
}

