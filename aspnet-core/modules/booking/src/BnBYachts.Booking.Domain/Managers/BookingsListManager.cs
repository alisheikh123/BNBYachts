using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Enums;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Contracts;
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
        private readonly IRepository<ContractEntity, int> _contractRepository;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        private readonly EventBusDispatcher _eventBusDispatcher;
        public BookingsListManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository, IObjectMapper<BookingDomainModule> objectMapper,
            EventBusDispatcher eventBusDispatcher, IRepository<CharterBookingEntity, int> charterBookingRepository,
            IRepository<ContractEntity, int> contractRepository, IRepository<EventBookingEntity, int> eventsBookingRepository)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _objectMapper = objectMapper;
            _eventBusDispatcher = eventBusDispatcher;
            _charterBookingRepository = charterBookingRepository;
            _contractRepository = contractRepository;
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
            if (param.Filter == BookingResponseFilter.Past)
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
                var contracts = _objectMapper.Map<List<ContractEntity>, List<BookingRequestsRequestableDto>>
                    (await _contractRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                    && res.Status == ContractsStatus.Approved && res.ServiceType == ServiceType.Charter).ConfigureAwait(false));
                allBookings.AddRange(contracts);
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            else if (param.Filter == BookingResponseFilter.Upcomings)
            {
                var allBookings = _objectMapper.Map<List<CharterBookingEntity>, List<BookingRequestsRequestableDto>>
                (await _charterBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                && res.BookingStatus == BookingStatus.Approved && res.DepartureDate > DateTime.Today &&
               (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.DepartureDate.Month == int.Parse(param.Month) && res.DepartureDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                var contracts = _objectMapper.Map<List<ContractEntity>, List<BookingRequestsRequestableDto>>
                    (await _contractRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                    && res.Status == ContractsStatus.Approved && res.ServiceType == ServiceType.Charter).ConfigureAwait(false));
                allBookings.AddRange(contracts);
                response.TotalCount = allBookings.Count;
                response.Data = await PagedList<BookingRequestsRequestableDto>.CreateAsync(allBookings, param.PageNo, param.PageSize).ConfigureAwait(false);
            }
            if (param.Filter == BookingResponseFilter.Past)
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
               (await _eventsBookingRepository.GetListAsync(res => res.HostId == param.UserId.ToString() &&
               res.BookingStatus == BookingStatus.Approved && (!string.IsNullOrEmpty(param.Month) && !string.IsNullOrEmpty(param.Year) ? (res.EventDate.Month == int.Parse(param.Month) && res.EventDate.Year == int.Parse(param.Year)) : (1 == 1))).ConfigureAwait(false));
                var contracts = _objectMapper.Map<List<ContractEntity>, List<BookingRequestsRequestableDto>>
                     (await _contractRepository.GetListAsync(res => res.HostId == param.UserId.ToString()
                     && res.Status == ContractsStatus.Approved && res.ServiceType == ServiceType.Event).ConfigureAwait(false));
                allBookings.AddRange(contracts);
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

        public async Task<EntityResponseListModel<BookingRequestsRequestableDto>> GetMyBookings(int boatId, Guid? userId)
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
                booking.PaymentStatus = isAccpeted ? PaymentStatus.Approved : PaymentStatus.Refund;

                if (isAccpeted == true)
                {
                    booking.BookingStatus = BookingStatus.Approved;
                    await _eventBusDispatcher.Publish<INotificationContract>(_getNotificationData("Reservation for {Boat_name} for boatel service has been accepted", "Boatel Reservation",
                  "Host Accept the Request of Booking",
                  booking.UserId, booking.HostId, (int)NotificationType.ReservationApproved, bookingId,
                   0, 0, booking.BoatId));
                }
                if (isAccpeted == false)
                {
                    booking.BookingStatus = BookingStatus.Rejected;
                    await _eventBusDispatcher.Publish<INotificationContract>(_getNotificationData("Reservation for {Boat_name} for boatel service has been rejected", "Boatel Reservation",
                     "Host reject the Request of Booking",
                     booking.UserId, booking.HostId, (int)NotificationType.ReservationRejected, bookingId,
                      0, 0, booking.BoatId));
                }


            }
            else if (serviceType == (int)BookingTypes.Charter)
            {
                var booking = await _charterBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
                booking.PaymentStatus = isAccpeted ? PaymentStatus.Approved : PaymentStatus.Refund;
                if (isAccpeted == true)
                {
                    booking.BookingStatus = BookingStatus.Approved;
                    await _eventBusDispatcher.Publish<INotificationContract>(_getNotificationData("Reservation for {Boat_name} for charter service has been accepted", "Charter Reservation",
                    "Host Accept the Request of Booking",
                    booking.UserId, booking.HostId, (int)NotificationType.ReservationApproved, bookingId, 0,
                    booking.CharterId, booking.BoatId.Value, 0));
                }
                if (isAccpeted == false)
                {
                    booking.BookingStatus = BookingStatus.Rejected;
                    await _eventBusDispatcher.Publish<INotificationContract>(_getNotificationData("Reservation for {Boat_name} for charter service has been rejected", "Charter Reservation",
                   "Host reject the Request of Booking",
                   booking.UserId, booking.HostId, (int)NotificationType.ReservationRejected, bookingId, 0,
                   booking.CharterId, booking.BoatId.Value, 0));
                }
              
            }
            else
            {
                var booking = await _eventsBookingRepository.FindAsync(res => res.Id == bookingId).ConfigureAwait(false);
                booking.PaymentStatus = isAccpeted ? PaymentStatus.Approved : PaymentStatus.Refund;
                if (isAccpeted == true)
                {
                    booking.BookingStatus = BookingStatus.Approved;
                    await _eventBusDispatcher.Publish<INotificationContract>(_getNotificationData("Reservation for {Boat_name} for event service has been accepted", "Event Reservation",
                    "Host Accept the Request of Booking",
                     booking.UserId, booking.HostId, (int)NotificationType.ReservationApproved, bookingId, booking.EventId,
                     0, booking.BoatId.Value, 0));
                }
                if (isAccpeted == false)
                {
                    booking.BookingStatus = BookingStatus.Rejected;
                    await _eventBusDispatcher.Publish<INotificationContract>(_getNotificationData("Reservation for {Boat_name} for event service has been rejected", "Event Reservation",
                    "Host reject the Request of Booking",
                     booking.UserId, booking.HostId, (int)NotificationType.ReservationRejected, bookingId, booking.EventId,
                     0, booking.BoatId.Value, 0));
                }

               
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

        private static NotificationContract _getNotificationData(string message, string title, string dec, string userto,
            string userfrom, int notificationType = 0, int bookingId = 0, int eventId = 0, int charterId = 0, int boatId = 0, int boatelId = 0) =>
        new NotificationContract
        {
            EventId = eventId,
            Message = message,
            Description = dec,
            UserTo = userto,
            UserFrom = userfrom,
            Title = title,
            BookingId = bookingId,
            NotificationType = (NotificationType)notificationType,
            CharterId = charterId,
            BoatId = boatId,


        };
    }

}



