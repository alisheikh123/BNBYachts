
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Contracts;
using BnBYachts.EventBusShared;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
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
        private readonly IRepository<ContractEntity, int> _contractsRepository;
        public UserBookingListManager(IRepository<CharterBookingEntity, int> charterBookingRepository, IObjectMapper<BookingDomainModule> objectMapper, IRepository<BoatelBookingEntity, int> repository, IRepository<BookingCancelEntity, int> repositorycancel, EventBusDispatcher eventBusDispatcher, IRepository<EventBookingEntity, int> eventBookingRepository, IRepository<ContractEntity, int> contractsRepository)
        {
            _boatelBookingRepository = repository;
            _boatelCanceRepository = repositorycancel;
            _eventBusDispatcher = eventBusDispatcher;
            _objectMapper = objectMapper;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
            _contractsRepository = contractsRepository;
        }

        public async Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetBoatelBookings(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BoatelBookingTransferableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>
                   (await _boatelBookingRepository.GetListAsync(res => res.CreatorId == param.UserId &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.CheckinDate.Month == int.Parse(param.Month) && res.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);

            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               x.CheckinDate > DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.CheckinDate.Month == int.Parse(param.Month) && x.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               x.CheckinDate < DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.CheckinDate.Month == int.Parse(param.Month) && x.CheckinDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }


        public async Task<EntityResponseListModel<CharterBookingTransferableDto>> GetCharterBookings(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<CharterBookingTransferableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>
                         (await _charterBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.DepartureDate.Month == int.Parse(param.Month) && x.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                var contracts = _objectMapper.Map<List<ContractEntity>, List<CharterBookingTransferableDto>>(await _contractsRepository.GetListAsync(res => res.Status == ContractsStatus.Approved && res.UserId == param.UserId.ToString() && res.ServiceType == ServiceType.Charter));
                allBooking.AddRange(contracts);
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>
                    (await _charterBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               x.DepartureDate > DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.DepartureDate.Month == int.Parse(param.Month) && x.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                var contracts = _objectMapper.Map<List<ContractEntity>, List<CharterBookingTransferableDto>>(await _contractsRepository.GetListAsync(res => res.Status == ContractsStatus.Approved && res.UserId == param.UserId.ToString() && res.ServiceType == ServiceType.Charter));
                allBooking.AddRange(contracts);
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>(await _charterBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               x.DepartureDate < DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.DepartureDate.Month == int.Parse(param.Month) && x.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                var contracts = _objectMapper.Map<List<ContractEntity>, List<CharterBookingTransferableDto>>(await _contractsRepository.GetListAsync(res => res.Status == ContractsStatus.Approved && res.UserId == param.UserId.ToString() && res.ServiceType == ServiceType.Charter));
                allBooking.AddRange(contracts);
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }

        public async Task<EntityResponseListModel<EventBookingTransferableDto>> GetEventBookings(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<EventBookingTransferableDto>();
            if (param.Filter == BookingResponseFilter.All)
            {
                var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>
                   (await _eventBookingRepository.GetListAsync(res => res.CreatorId == param.UserId &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                var contracts = _objectMapper.Map<List<ContractEntity>, List<EventBookingTransferableDto>>(await _contractsRepository.GetListAsync(res => res.Status == ContractsStatus.Approved && res.UserId == param.UserId.ToString() && res.ServiceType == ServiceType.Event));
                allBooking.AddRange(contracts);
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);

            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>
                    (await _eventBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               x.EventDate > DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.EventDate.Month == int.Parse(param.Month) && x.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else
            {
                var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>
                    (await _eventBookingRepository.GetListAsync(x => x.CreatorId == param.UserId &&
               x.EventDate < DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (x.EventDate.Month == int.Parse(param.Month) && x.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                response.TotalCount = allBooking.Count;
                response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            return response;
        }
        public async Task<BoatelBookingTransferableDto> GetBoatelBooking(int bookingId)
            => _objectMapper.Map<BoatelBookingEntity, BoatelBookingTransferableDto>
            (await _boatelBookingRepository.GetAsync(res => res.Id == bookingId).ConfigureAwait(false));



        public async Task<ICollection<BoatelBookingTransferableDto>> GetHostBoatelBookings(string hostId)
        => _objectMapper.Map<ICollection<BoatelBookingEntity>, ICollection<BoatelBookingTransferableDto>>
            (await _boatelBookingRepository.GetListAsync(res => res.HostId == hostId).ConfigureAwait(false));

        public async Task<EntityResponseListModel<BookingsLookupDto>> GetMyBookings(Guid? userId)
        {
            var response = new EntityResponseListModel<BookingsLookupDto>();
            response.Data = _objectMapper.Map<List<BoatelBookingEntity>, List<BookingsLookupDto>>(await _boatelBookingRepository.GetListAsync(res => res.CreatorId == userId && res.BookingStatus == BookingStatus.Approved));
            var charterBookings = _objectMapper.Map<List<CharterBookingEntity>, List<BookingsLookupDto>>(await _charterBookingRepository.GetListAsync(res => res.CreatorId == userId && res.BookingStatus == BookingStatus.Approved));
            response.Data.AddRange(charterBookings);
            var eventBookings = _objectMapper.Map<List<EventBookingEntity>, List<BookingsLookupDto>>(await _eventBookingRepository.GetListAsync(res => res.CreatorId == userId && res.BookingStatus == BookingStatus.Approved));
            response.Data.AddRange(eventBookings);
            return response;
        }

        public async Task<EntityResponseListModel<BoatelBookingTransferableDto>> GetHostUpcomingBoatelBookings(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<BoatelBookingTransferableDto>();
            var allBooking = _objectMapper.Map<List<BoatelBookingEntity>, List<BoatelBookingTransferableDto>>(await _boatelBookingRepository.GetListAsync(x => x.HostId == param.UserId.ToString() &&
                 x.CheckinDate > DateTime.Today).ConfigureAwait(false));
            response.TotalCount = allBooking.Count;
            response.Data = await PagedList<BoatelBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            return response;
        }

        public async Task<EntityResponseListModel<CharterBookingTransferableDto>> GetHostUpcomingCharterBookings(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<CharterBookingTransferableDto>();
            var allBooking = _objectMapper.Map<List<CharterBookingEntity>, List<CharterBookingTransferableDto>>(await _charterBookingRepository.GetListAsync(x => x.HostId == param.UserId.ToString() &&
                 x.DepartureDate > DateTime.Today).ConfigureAwait(false));
            response.TotalCount = allBooking.Count;
            response.Data = await PagedList<CharterBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            return response;
        }

        public async Task<EntityResponseListModel<EventBookingTransferableDto>> GetHostUpcomingEventBookings(EntityBookingParamsDto param)
        {
            var response = new EntityResponseListModel<EventBookingTransferableDto>();
            var allBooking = _objectMapper.Map<List<EventBookingEntity>, List<EventBookingTransferableDto>>(await _eventBookingRepository.GetListAsync(x => x.HostId == param.UserId.ToString() &&
                 x.EventDate > DateTime.Today).ConfigureAwait(false));
            response.TotalCount = allBooking.Count;
            response.Data = await PagedList<EventBookingTransferableDto>.CreateAsync(allBooking, param.PageNo, param.PageSize).ConfigureAwait(false);
            return response;
        }
    }
}
