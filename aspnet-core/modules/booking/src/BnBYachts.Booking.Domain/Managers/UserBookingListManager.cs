using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.EventBusShared;
using BnBYachts.Shared.Model;
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
    public class UserBookingListManager : DomainService, IUserBookingListManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventBookingRepository;
        private readonly IRepository<BookingCancelEntity, int> _boatelCanceRepository;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public UserBookingListManager(IRepository<CharterBookingEntity, int> charterBookingRepository, IObjectMapper<BookingDomainModule> objectMapper, IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel, EventBusDispatcher eventBusDispatcher, IRepository<EventBookingEntity, int> eventBookingRepository)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
            _eventBusDispatcher = eventBusDispatcher;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
        }

        public async Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter, BookingType bookingType, Guid? userId, string month, string year, int pageNo, int pageSize)
        {
            var response = new EntityResponseListModel<BoatelBookingTransferableDto>();
            if (filter == BookingResponseFilter.All)
            {
                var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>
                   (await _boatelBookingRepository.GetListAsync(res => res.CreatorId == userId &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (res.CheckinDate.Month == int.Parse(month) && res.CheckinDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);

            }
            else if (filter == BookingResponseFilter.Upcomings)
            {
                var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.CreatorId == userId &&
               x.CheckinDate > DateTime.Today &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.CheckinDate.Month == int.Parse(month) && x.CheckinDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);
            }
            else
            {
                var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.CreatorId == userId &&
               x.CheckinDate < DateTime.Today &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.CheckinDate.Month == int.Parse(month) && x.CheckinDate.Year== int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);
            }
            return response;
        }


        public async Task<EntityResponseListModel<CharterBookingTransferableDto>> GetCharterBookings(BookingResponseFilter filter, BookingType bookingType, Guid? userId, string month, string year, int pageNo, int pageSize)
        {
            var response = new EntityResponseListModel<CharterBookingTransferableDto>();
            if (filter == BookingResponseFilter.All)
            {
                var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>
                         (await _charterBookingRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false));

                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);

            }
            else if (filter == BookingResponseFilter.Upcomings)
            {
                var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>
                    (await _charterBookingRepository.GetListAsync(x => x.CreatorId == userId &&
               x.DepartureDate > DateTime.Today &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.DepartureDate.Month == int.Parse(month) && x.DepartureDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);
            }
            else
            {
                var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>(await _charterBookingRepository.GetListAsync(x => x.CreatorId == userId &&
               x.DepartureDate < DateTime.Today &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.DepartureDate.Month == int.Parse(month) && x.DepartureDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);
            }
            return response;
        }

        public async Task<EntityResponseListModel<EventBookingTransferableDto>> GetEventBookings(BookingResponseFilter filter, BookingType bookingType, Guid? userId, string month, string year, int pageNo, int pageSize)
        {
            var response = new EntityResponseListModel<EventBookingTransferableDto>();
            if (filter == BookingResponseFilter.All)
            {
                var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>
                   (await _eventBookingRepository.GetListAsync(res => res.CreatorId == userId &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (res.EventDate.Month == int.Parse(month) && res.EventDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);

            }
            else if (filter == BookingResponseFilter.Upcomings)
            {
                var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>
                    (await _eventBookingRepository.GetListAsync(x => x.CreatorId == userId &&
               x.EventDate > DateTime.Today &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.EventDate.Month == int.Parse(month) && x.EventDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);
            }
            else
            {
                var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>
                    (await _eventBookingRepository.GetListAsync(x => x.CreatorId == userId &&
               x.EventDate < DateTime.Today &&
               (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.EventDate.Month == int.Parse(month) && x.EventDate.Year == int.Parse(year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, pageNo, pageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId)
            => _objectMapper.Map<BoatelBookingEntity, BoatelBookingTransferableDto>
            (await _boatelBookingRepository.GetAsync(res => res.Id == bookingId).ConfigureAwait(false));

        public async Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings(string hostId)
        => _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BoatelBookingTransferableDto>>
            (await _boatelBookingRepository.GetListAsync(res => res.HostId == hostId).ConfigureAwait(false));




    }
}
