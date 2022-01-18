using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Booking.Managers
{
    public class BookingCalendarManager : DomainService, IBookingCalendarManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventBookingRepository;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public BookingCalendarManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository,
            IRepository<CharterBookingEntity, int> charterBookingRepository,
            IRepository<EventBookingEntity, int> eventBookingRepository,
            IObjectMapper<BookingDomainModule> objectMapper)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;

        }

        public async Task<EntityResponseListModel<CalendarTransferable>> GetBoatelBookings(Guid? userId)
        {
            var result = new EntityResponseListModel<CalendarTransferable>();
            result.Data = _objectMapper.Map<List<BoatelBookingEntity>,List<CalendarTransferable>>(
                await _boatelBookingRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false));
            return result;
        }

        public async Task<EntityResponseListModel<CalendarTransferable>> GetCharterBookings(Guid? userId)
        {
            var result = new EntityResponseListModel<CalendarTransferable>();
            result.Data = _objectMapper.Map<List<CharterBookingEntity>, List<CalendarTransferable>>(
                await _charterBookingRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false));
            return result;
        }

        public async Task<EntityResponseListModel<CalendarTransferable>> GetEventBookings(Guid? userId)
        {
            var result = new EntityResponseListModel<CalendarTransferable>();
            result.Data = _objectMapper.Map<List<EventBookingEntity>, List<CalendarTransferable>>(
                await _eventBookingRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false));
            return result;
        }
        public async Task<EntityResponseModel> GetBoatBookingCalendar(string hostId,int month, int boatId)
        {
            var getBoatelBookings = await _boatelBookingRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId && res.CheckinDate.Month == month).ConfigureAwait(false);
            var getCharterBookings = await _charterBookingRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId  && res.DepartureDate.Month == month).ConfigureAwait(false);
            var getEventsBooking = await _eventBookingRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId &&  res.EventDate.Month == month).ConfigureAwait(false);
            var response = new BookingCalendarTransferable();
            response.Boatels = _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<CalendarTransferable>>(getBoatelBookings);
            response.Charters = _objectMapper.Map<ICollection<CharterBookingEntity>, ICollection<CalendarTransferable>>(getCharterBookings);
            response.Events = _objectMapper.Map<ICollection<EventBookingEntity>, ICollection<CalendarTransferable>>(getEventsBooking);
            return new EntityResponseModel()
            {
                Data = response
            };
        }
    }
}
