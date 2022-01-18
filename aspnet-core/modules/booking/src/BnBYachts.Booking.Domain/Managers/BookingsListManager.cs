using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Enums;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Interfaces;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
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
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookedServices(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allBookings = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBookings = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved && res.CheckinDate > DateTime.Today &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allBookings = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved && res.CheckinDate < DateTime.Today &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersBookedServices(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allBookings = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
               (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
               && res.BookingStatus == BookingStatus.Approved &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBookings = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved && res.DepartureDate > DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allBookings = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
                  (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                  && res.BookingStatus == BookingStatus.Approved && res.DepartureDate < DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsBookedServices(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allBookings = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsRequestableDto>>
               (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()&& 
               res.BookingStatus == BookingStatus.Approved && (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBookings = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved && res.EventDate > DateTime.Today &&
                   (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allBookings = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved && res.EventDate < DateTime.Today &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetBookingsRequests(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allRequests = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Pending
                &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allRequests = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _boatelBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Pending && res.CheckinDate > DateTime.Today &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allRequests = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
                 (await _boatelBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                 && res.BookingStatus == BookingStatus.Pending && res.CheckinDate < DateTime.Today &&
                 (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetChartersRequests(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allRequests = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
               (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
               && res.BookingStatus == BookingStatus.Pending &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allRequests = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Pending && res.DepartureDate > DateTime.Today
                &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allRequests = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
               (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
               && res.BookingStatus == BookingStatus.Pending && res.DepartureDate < DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetEventsRequests(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allRequests = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsRequestableDto>>
                 (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                 && res.BookingStatus == BookingStatus.Pending && (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allRequests = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsRequestableDto>>
                   (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                   && res.BookingStatus == BookingStatus.Pending && res.EventDate > DateTime.Today &&
                   (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allRequests = _objectMapper.Map<List<EventBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Pending && res.EventDate < DateTime.Today &&
                (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allRequests.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allRequests, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetDroppedServices(Guid? userId)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>
            (await _boatelBookingRepository.GetListAsync(res => res.HostId == userId.ToString()
            && res.BookingStatus == BookingStatus.Rejected).ConfigureAwait(false));
            return response;
        }

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetMyBookings(int boatId,Guid? userId)
        {
            var response = new EntityResponseListModel<BookingRequestsRequestableDto>();
            response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingRequestsRequestableDto>>(
                await _boatelBookingRepository.GetListAsync(res => res.BoatId == boatId && res.CreatorId == userId && res.BookingStatus != BookingStatus.Rejected).ConfigureAwait(false));
            return response;
        }

        public async Task<bool> UpdateReservationStatus(int bookingId, bool isAccpeted, string rejectionReason, int serviceType)
        {
            string userName = "";
            if (serviceType == (int)BookingTypes.Boatel)
            {
                var booking = await _boatelBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
                userName = booking.UserName;
                booking.BookingStatus = isAccpeted ? BookingStatus.Approved : BookingStatus.Rejected;
            }
            else if (serviceType == (int)BookingTypes.Charter)
            {
                var booking = await _charterBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
                booking.BookingStatus = isAccpeted ? BookingStatus.Approved : BookingStatus.Rejected;
            }
            else
            {
                var booking = await _eventsBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
                booking.BookingStatus = isAccpeted ? BookingStatus.Approved : BookingStatus.Rejected;
            }

            #region Send-Email
            string body = $"<h4> Your booking has been {(isAccpeted ? "Accepted" : "Rejected")} due to {rejectionReason}.</h4>";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = userName,
                Subject = "Booking Status",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
            #endregion
            return true;
        }
    }
}
