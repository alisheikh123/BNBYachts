using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
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
    public class CalendarManager : DomainService//, ICalendarManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventBookingRepository;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public CalendarManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository,
            IRepository<CharterBookingEntity, int> charterBookingRepository,
            IRepository<EventBookingEntity, int> eventBookingRepository,
            IObjectMapper<BookingDomainModule> objectMapper)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;

        }
        //public async Task<EntityResponseListModel<BookingCalendarTransferable>> GetBookings(string hostId)
        //{
        //    var getBoatelBookings = await _boatelBookingRepository.GetListAsync(res => res.HostId == hostId).ConfigureAwait(false);
        //    var getCharterBookings = await _charterBookingRepository.GetListAsync(res => res.HostId == hostId).ConfigureAwait(false);
        //    var getEventsBookings = await _eventBookingRepository.GetListAsync(res => res.HostId == hostId).ConfigureAwait(false);
        //}
    }
}
