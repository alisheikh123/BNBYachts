using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Enums;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Interfaces;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Booking.Managers
{
    public class BookingsListManager : DomainService, IBookingsListManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventsBookingRepository;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        private readonly EventBusDispatcher _eventBusDispatcher;
        public BookingsListManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository, IObjectMapper<BookingDomainModule> objectMapper,
            EventBusDispatcher eventBusDispatcher, IRepository<CharterBookingEntity, int> charterBookingRepository, IRepository<EventBookingEntity, int> eventsBookingRepository)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _objectMapper = objectMapper;
            _eventBusDispatcher = eventBusDispatcher;
            _charterBookingRepository = charterBookingRepository;
            _eventsBookingRepository = eventsBookingRepository;
        }
        public async Task<EntityResponseListModel<BookingRequestsDto>> GetBookedServices(Guid? userId, int serviceType)
        {
            var response = new EntityResponseListModel<BookingRequestsDto>();
            if (serviceType == (int)BookingTypes.Boatel)
            {
                response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
                && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            }
            else if (serviceType == (int)BookingTypes.Charter)
            {
                response.Data = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsDto>>
                (await _charterBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
                && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            }
            else
            {
                response.Data = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsDto>>
                (await _eventsBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
                && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsDto>> GetBookingsRequests(Guid? userId, string month, string year)
        {
            var response = new EntityResponseListModel<BookingRequestsDto>();
            if (!string.IsNullOrEmpty(month) || !string.IsNullOrEmpty(year))
            {
                response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsDto>>(await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString() && res.BookingStatus == BookingStatus.Pending && (res.CheckinDate.Month.ToString() == month && res.CheckinDate.Year.ToString() == year)).ConfigureAwait(false));
            }
            response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsDto>>(await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString() && res.BookingStatus == BookingStatus.Pending).ConfigureAwait(false));
            return response;
        }

        public async Task<EntityResponseListModel<BookingRequestsDto>> GetDroppedServices(Guid? userId)
        {
            var response = new EntityResponseListModel<BookingRequestsDto>();
            response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsDto>>
            (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
            && res.BookingStatus == BookingStatus.Rejected).ConfigureAwait(false));
            return response;
        }
        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted)
        {
            var booking = await _boatelBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
            booking.BookingStatus = isAccpeted ? BookingStatus.Approved : BookingStatus.Rejected;

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
    }
}
