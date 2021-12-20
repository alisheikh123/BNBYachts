using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.EventBusShared;
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
        private readonly IRepository<BookingCancelEntity, int> _boatelCanceRepository;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public UserBookingListManager(IRepository<CharterBookingEntity, int> charterBookingRepository, IObjectMapper<BookingDomainModule> objectMapper, IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel, EventBusDispatcher eventBusDispatcher)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
            _eventBusDispatcher = eventBusDispatcher;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
        }

        public async Task<ICollection<BoatelBookingTransferableDto>> GetBoatelBookings(BookingResponseFilter filter, Guid? userId, string month, string year)
        {
            if(filter == BookingResponseFilter.All)
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity> ,ICollection <BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false));
            }
            else if (filter == BookingResponseFilter.Upcomings)
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.CreatorId == userId && 
                x.CheckinDate > DateTime.Today &&
                (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.CheckinDate.Month.ToString() == month && x.CheckinDate.Year.ToString() == year) : (1 == 1))).ConfigureAwait(false));
            }
            else
            {
                return _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.CreatorId == userId &&
                x.CheckinDate < DateTime.Today &&
                (!string.IsNullOrEmpty(month) && !string.IsNullOrEmpty(year) ? (x.CheckinDate.Month.ToString() == month && x.CheckinDate.Year.ToString() == year):(1==1))).ConfigureAwait(false));
            }
        }
        public async Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId)
            => _objectMapper.Map<BoatelBookingEntity, BoatelBookingTransferableDto>
            (await _boatelBookingRepository.GetAsync(res => res.Id == bookingId).ConfigureAwait(false));

        public async Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings(string hostId)
        => _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BoatelBookingTransferableDto>>
            (await _boatelBookingRepository.GetListAsync(res => res.HostId == hostId).ConfigureAwait(false));
    }
}
