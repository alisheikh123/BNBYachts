using AutoMapper;
using BnBYachts.Booking.Booking.Enums;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Interfaces;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        private readonly EventBusDispatcher _eventBusDispatcher;
        public BookingsListManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository, IObjectMapper<BookingDomainModule> objectMapper, EventBusDispatcher eventBusDispatcher)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _objectMapper = objectMapper;
            _eventBusDispatcher = eventBusDispatcher;
        }
        public async Task<ICollection<BookingRequestsDto>> GetBookedServices(Guid? userId, int serviceType)
        {
            if (serviceType == (int)BookingTypes.Boatel)
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BookingRequestsDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
                && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            }
            else if (serviceType == (int)BookingTypes.Charter)
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BookingRequestsDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
                && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            }
            else
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BookingRequestsDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
                && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            }

        }
        public async Task<ICollection<BookingRequestsDto>> GetBookingsRequests(Guid? userId, string month, string year)
        {
            if (!string.IsNullOrEmpty(month) || !string.IsNullOrEmpty(year))
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BookingRequestsDto>>(await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString() && res.BookingStatus == BookingStatus.Pending && (res.CheckinDate.Month.ToString() == month && res.CheckinDate.Year.ToString() == year)).ConfigureAwait(false));
            }
            return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BookingRequestsDto>>(await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString() && res.BookingStatus == BookingStatus.Pending).ConfigureAwait(false));
        }

        public async Task<ICollection<BookingRequestsDto>> GetDroppedServices(Guid? userId) => _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BookingRequestsDto>>
            (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
            && res.BookingStatus == BookingStatus.Rejected).ConfigureAwait(false));

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
