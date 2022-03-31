using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Booking.Managers
{
    public class BoatBookingManager : DomainService, IBoatBookingManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventBookingRepository;
        private readonly IRepository<BookingCancelEntity, int> _boatelCanceRepository;
        private readonly IRepository<BookingRefundableEntity, int> _boatelRefundRepository;
        private readonly ILogger<IBoatBookingManager> _logger;

        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public BoatBookingManager(IRepository<CharterBookingEntity, int> charterBookingRepository, IObjectMapper<BookingDomainModule> objectMapper,
            IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel, EventBusDispatcher eventBusDispatcher
            , IRepository<EventBookingEntity, int> eventBookingRepository, IRepository<BookingRefundableEntity, int> boatelRefundRepository, ILogger<IBoatBookingManager> logger)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
            _eventBusDispatcher = eventBusDispatcher;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
            _boatelRefundRepository = boatelRefundRepository;
            _logger = logger;

        }

        public async Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data, Guid? userId, string userName, string email)
        {
            data.CheckinDate = data.CheckinDate.Date;
            data.CheckoutDate = data.CheckoutDate.Date;
            var boatelEntity = _objectMapper.Map<BoatelBookingRequestableDto, BoatelBookingEntity>(data);
            boatelEntity.LastModifierId = boatelEntity.CreatorId = userId;
            boatelEntity.UserId = userId.ToString();
            boatelEntity.UserName = userName;
            var response = await _boatelBookingRepository.InsertAsync(boatelEntity, autoSave: true).ConfigureAwait(false);
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
            return new EntityResponseModel()
            {
                ReturnStatus = true,
                Errors = null,
                Data = response
            };
        }
        public async Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data, Guid? userId, string userName,string email)
        {
            var charterEntity = _objectMapper.Map<CharterBookingRequestableDto, CharterBookingEntity>(data);
            charterEntity.LastModifierId = charterEntity.CreatorId = userId;
            charterEntity.UserId = userId.ToString();
            charterEntity.BookingStatus = BookingStatus.Pending;
            charterEntity.PaymentStatus = PaymentStatus.Pending;
            charterEntity.UserName = userName;
            var response = await _charterBookingRepository.InsertAsync(charterEntity, autoSave: true).ConfigureAwait(false);
            #region Send-Email
            string body = $"<h4> Your charter has been booked successfuly. Please wait for the host's approval. </h4>";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = email,
                Subject = "Charter Booked",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
            #endregion
            return new EntityResponseModel()
            {
                ReturnStatus = true,
                Errors = null,
                Data = response
            };
        }
        public async Task<EntityResponseModel> EventBooking(EventBookingRequestableDto data, Guid? userId,string userName, string email)
        {
            var eventEntity = _objectMapper.Map<EventBookingRequestableDto, EventBookingEntity>(data);
            eventEntity.LastModifierId = eventEntity.CreatorId = userId;
            eventEntity.UserId = userId.ToString();
            eventEntity.BookingStatus = BookingStatus.Pending;
            eventEntity.PaymentStatus = PaymentStatus.Pending;
            eventEntity.UserName = userName;
            var response = await _eventBookingRepository.InsertAsync(eventEntity, autoSave: true).ConfigureAwait(false);
            #region Send-Email
            string body = $"<h4> Your event has been booked successfuly. Please wait for the host's approval. </h4>";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = email,
                Subject = "Event Booked",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
            #endregion
            return new EntityResponseModel()
            {
                ReturnStatus = true,
                Errors = null,
                Data = response
            };
        }
        public async Task ModifyBoatelBooking(BookingRequestsRequestableDto data, Guid? userId, string userName)
        {
            var bookingEntity = await _boatelBookingRepository.FindAsync(res => res.Id == data.Id).ConfigureAwait(false);
            _objectMapper.Map<BookingRequestsRequestableDto, BoatelBookingEntity>(data, bookingEntity);
            bookingEntity.CheckinDate = data.CheckinDate.Date;
            bookingEntity.LastModificationTime = DateTime.Now;
            bookingEntity.LastModifierId = userId;
            await _boatelBookingRepository.UpdateAsync(bookingEntity, autoSave: true).ConfigureAwait(false);
            _logger.LogInformation("Update the Boatel Booking");
        }
        public async Task<bool> IsBookingCancel(BookingCancellationRequestableDto data, string userId)
        {
            if (data != null)
            {
                BookingCancelEntity model = new BookingCancelEntity();
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
                model.BookingType = data.BookingType;
                model.isNotificationSent = data.isNotificationSent;
                model.Reason = data.Reason;
                model.UserId = data.UserId;
                model.RefundAmount = data.RefundAmount;
                model.TotalAmount = data.TotalAmount;
                await _boatelCanceRepository.InsertAsync(model);
                return true;
            }
            return false;
        }

        public async Task<EntityResponseModel> GetBookingCancellationDetail(long bookingId, Guid? userId)
        {
           var response = await _boatelCanceRepository.GetListAsync(x => x.BookingId == bookingId && x.UserId == userId.ToString()).ConfigureAwait(false);
            return new EntityResponseModel()
            {
                Data = response
            };
        }
    }
}

