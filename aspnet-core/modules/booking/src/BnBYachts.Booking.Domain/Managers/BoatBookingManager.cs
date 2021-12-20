using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Booking.Shared.BoatBooking.Interface;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
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
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public BoatBookingManager(IRepository<CharterBookingEntity, int> charterBookingRepository, IObjectMapper<BookingDomainModule> objectMapper,
            IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel, EventBusDispatcher eventBusDispatcher
            , IRepository<EventBookingEntity, int> eventBookingRepository)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
            _eventBusDispatcher = eventBusDispatcher;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
        }

        public async Task<EntityResponseModel> BoatelBooking(BoatelBookingRequestableDto data, Guid? userId, string userName)
        {
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
        public async Task<EntityResponseModel> CharterBooking(CharterBookingRequestableDto data, Guid? userId, string email)
        {
            var charterEntity = _objectMapper.Map<CharterBookingRequestableDto, CharterBookingEntity>(data);
            charterEntity.LastModifierId = charterEntity.CreatorId = userId;
            charterEntity.UserId = userId.ToString();
            charterEntity.BookingStatus = BookingStatus.Pending;
            charterEntity.PaymentStatus = PaymentStatus.Pending;
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
        public async Task<EntityResponseModel> EventBooking(EventBookingRequestableDto data, Guid? userId, string email)
        {
            var eventEntity = _objectMapper.Map<EventBookingRequestableDto, EventBookingEntity>(data);
            eventEntity.LastModifierId = eventEntity.CreatorId = userId;
            eventEntity.UserId = userId.ToString();
            eventEntity.BookingStatus = BookingStatus.Pending;
            eventEntity.PaymentStatus = PaymentStatus.Pending;
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
        public async Task<bool> ModifyBoatelBooking(BookingRequestsRequestableDto data, Guid? userId, string userName)
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
        public async Task<bool> IsBookingCancel(BookingCancellationRequestableDto data, string userId)
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

    }
}

