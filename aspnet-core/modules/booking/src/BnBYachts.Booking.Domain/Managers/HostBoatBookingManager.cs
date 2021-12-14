using BnBYachts.Booking.Booking;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using BnBYachts.Booking.Shared.BoatBooking.Transferable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
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
        private readonly EventBusDispatcher _eventBusDispatcher;


        public HostBoatBookingManager(IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel, EventBusDispatcher eventBusDispatcher)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
            _eventBusDispatcher = eventBusDispatcher;
        }

        public async Task<BoatelBookingTransferable> BoatelBooking(BoatelBookingEntity data, Guid? userId, string userName)
        {
            BoatelBookingTransferable dto = new BoatelBookingTransferable();
            data.LastModifierId = data.CreatorId = userId;
            data.UserId = userId.ToString();
            data.UserName = userName;
            var response = await _boatelBookingRepository.InsertAsync(data, autoSave: true).ConfigureAwait(false);
            dto.isSucces = true;
            dto.BookingId = response.Id;
            #region Send-Email
            string body = $"<h4> Your boat has been booked successfuly. Please wait for the host's approval. </h4>";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = data.UserName,
                Subject = "Boat Booked",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
            #endregion
            return dto;
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
                booking.BookingStatus = data.BookingStatus;
                booking.PaymentStatus = data.PaymentStatus;
                booking.LastModificationTime = DateTime.Now;
                booking.LastModifierId = userId;

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

                model.BookingId = data.BookingId;
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


        public async Task<ICollection<BoatelBookingEntity>> PastBoatelBookingDetail(string userId,string month, string year)
        {
            if (!string.IsNullOrEmpty(month) || !string.IsNullOrEmpty(year))
            {
                var filteredPastBooking = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate < DateTime.Today && (x.CheckinDate.Month.ToString() == month && x.CheckinDate.Year.ToString() == year)).ConfigureAwait(false);
                return filteredPastBooking;
            }
            var pastBooking = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate < DateTime.Today).ConfigureAwait(false);
            return pastBooking;
        }

        public async Task<ICollection<BoatelBookingEntity>> UpcomingBoatelBookingDetail(string userId,string month, string year)
        {
            if (!string.IsNullOrEmpty(month) || !string.IsNullOrEmpty(year))
            {
                var filteredUpcomingBookings = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate > DateTime.Today && (x.CheckinDate.Month.ToString() == month && x.CheckinDate.Year.ToString() == year)).ConfigureAwait(false);
                return filteredUpcomingBookings;
            }
            var upcomingBookings = await _boatelBookingRepository.GetListAsync(x => x.UserId == userId && x.CheckinDate > DateTime.Today).ConfigureAwait(false);
            return upcomingBookings;
        }

        public async Task<ICollection<BoatelBookingEntity>> GetMyBookings(string userId)
        {
            var myBookings = await _boatelBookingRepository.GetListAsync(x => x.CreatorId.ToString() == userId).ConfigureAwait(false);
            return myBookings;
        }

        public async Task<ICollection<BoatelBookingEntity>> UpcomingHostBoatelBookingDetail(string userId)
        {
            var upcomingBookings = await _boatelBookingRepository.GetListAsync(x => x.HostId == userId && x.CheckinDate > DateTime.Today).ConfigureAwait(false);
            return upcomingBookings;
        }
    }
}

