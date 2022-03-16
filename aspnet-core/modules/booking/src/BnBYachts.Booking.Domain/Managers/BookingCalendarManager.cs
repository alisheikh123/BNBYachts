using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Contracts;
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
        private readonly IRepository<ContractEntity, int> _contractRepository;
        public BookingCalendarManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository,
            IRepository<CharterBookingEntity, int> charterBookingRepository,
            IRepository<EventBookingEntity, int> eventBookingRepository,
            IObjectMapper<BookingDomainModule> objectMapper,
            IRepository<ContractEntity, int> contractRepository)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
            _contractRepository = contractRepository;
        }

        public async Task<EntityResponseListModel<CalendarTransferable>> GetBoatelBookings(Guid? userId)
        {
            var result = new EntityResponseListModel<CalendarTransferable>();
            result.Data = _objectMapper.Map<List<BoatelBookingEntity>,List<CalendarTransferable>>(
                await _boatelBookingRepository.GetListAsync(res => res.CreatorId == userId && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            return result;
        }

        public async Task<EntityResponseListModel<CalendarTransferable>> GetCharterBookings(Guid? userId)
        {
            var result = new EntityResponseListModel<CalendarTransferable>();
            result.Data = _objectMapper.Map<List<CharterBookingEntity>, List<CalendarTransferable>>(
                await _charterBookingRepository.GetListAsync(res => res.CreatorId == userId && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            return result;
        }

        public async Task<EntityResponseListModel<CalendarTransferable>> GetEventBookings(Guid? userId)
        {
            var result = new EntityResponseListModel<CalendarTransferable>();
            result.Data = _objectMapper.Map<List<EventBookingEntity>, List<CalendarTransferable>>(
                await _eventBookingRepository.GetListAsync(res => res.CreatorId == userId && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false));
            return result;
        }
        public async Task<EntityResponseModel> GetBoatBookingCalendar(string hostId,int month, int boatId)
        {
            var getBoatelBookings = await _boatelBookingRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId && res.CheckinDate.Month == month && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false);
            var getCharterBookings = await _charterBookingRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId  && res.DepartureDate.Month == month && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false);
            var getEventsBooking = await _eventBookingRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId &&  res.EventDate.Month == month && res.BookingStatus == BookingStatus.Approved).ConfigureAwait(false);
            var getContrats = await _contractRepository.GetListAsync(res => res.HostId == hostId && res.BoatId == boatId && (res.ServiceType == ServiceType.Event && res.EventDateTime.Month == month || res.ServiceType == ServiceType.Charter && res.DepartureDate.Month == month) && res.Status == ContractsStatus.Approved).ConfigureAwait(false);
            var response = new BookingCalendarTransferable();
            response.Boatels = _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<CalendarTransferable>>(getBoatelBookings);
            response.Charters = _objectMapper.Map<ICollection<CharterBookingEntity>, ICollection<CalendarTransferable>>(getCharterBookings);
            response.Events = _objectMapper.Map<ICollection<EventBookingEntity>, ICollection<CalendarTransferable>>(getEventsBooking);
            var contracts = _objectMapper.Map<ICollection<ContractEntity>, ICollection<CalendarTransferable>>(getContrats);
            var chraterContracts = contracts.WhereIf(boatId > 0, res => res.ServiceType == (int)ServiceType.Charter);
           
            foreach (var item in chraterContracts)
            {
                response.Charters.Add(item);
            }
            var eventContracts = contracts.WhereIf(boatId > 0, res => res.ServiceType == (int)ServiceType.Event);
            foreach (var item in eventContracts)
            {
                response.Events.Add(item);
            }
            return new EntityResponseModel()
            {
                Data = response
            };
        }
    }
}
