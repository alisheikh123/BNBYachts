using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces.Event;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.DTO;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace BnBYachts.Booking.Managers.Event
{
    public class EventBookingManager : DomainService, IEventBookingManager
    {

        private readonly ILogger<IEventBookingManager> _logger;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        private readonly IRepository<EventBookingEntity> _repository;
        private readonly IRepository<BookingCancelEntity> _eventCancelRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly IRepository<BookingRefundableEntity> _bookingRefundableRepository;

        public EventBookingManager(ILogger<IEventBookingManager> logger,
            IObjectMapper<BookingDomainModule> objectMapper,
            IRepository<EventBookingEntity> repository,
            IRepository<BookingCancelEntity> eventCancelRepository,
            IUnitOfWorkManager unitOfWorkManager,
            IRepository<BookingRefundableEntity> bookingRefundableRepository)
        {
            _logger = logger;
            _objectMapper = objectMapper;
            _repository = repository;
            _eventCancelRepository = eventCancelRepository;
            _unitOfWorkManager = unitOfWorkManager;
            _bookingRefundableRepository = bookingRefundableRepository;
        }

        public async Task<EntityResponseModel> BookingCancelDetail(long bookingId)
        {
            var response = new EntityResponseModel();
            _logger.LogInformation("Get Booking Cancellation Detail Against Booking");
            response.Data = await _eventCancelRepository.FirstOrDefaultAsync(x => x.BookingId == bookingId).ConfigureAwait(false);
            return response;
        }

        public async Task CancelEventBooking(BookingCancellationRequestableDto eventBookingCancellationRequestable)
        {
            var eventBookingDetail = await _repository.FirstOrDefaultAsync(x => x.Id == eventBookingCancellationRequestable.BookingId);
            eventBookingDetail.BookingStatus = BookingStatus.Cancel;
            await _eventCancelRepository.InsertAsync(_objectMapper.Map<BookingCancellationRequestableDto, BookingCancelEntity>(eventBookingCancellationRequestable));
            _logger.LogInformation("Update Event Cancellation Against this userId:" + _unitOfWorkManager.Current.Id.ToString());
        }

        public async Task<EntityResponseModel> EventBookingDetailById(long eventId)
        {
            var response = new EntityResponseModel();
            response.Data = await _repository.FirstOrDefaultAsync(x => x.Id == eventId).ConfigureAwait(false);
            _logger.LogInformation("get event Booking detail by Id");
            return response;
        }

        public async Task ModifyEventBooking(EventBookingRequestableDto data)
        {
            var eventBookingEntity = await _repository.FindAsync(res => res.Id == data.Id).ConfigureAwait(false);
            _objectMapper.Map<EventBookingRequestableDto, EventBookingEntity>(data, eventBookingEntity);
            eventBookingEntity.LastModificationTime = DateTime.Now;
            eventBookingEntity.LastModifierId = Guid.Parse(data.UserId);
            await _repository.UpdateAsync(eventBookingEntity, autoSave: true).ConfigureAwait(false);
            _logger.LogInformation("Update the Event Booking");
        }

        public async Task ModifyEventBookingRefundable(BookingRefundableRequestable data, Guid? userId)
        {
            var bookingRefundableDetail = _objectMapper.Map<BookingRefundableRequestable, BookingRefundableEntity>(data);
            bookingRefundableDetail.UserId = userId.ToString();
            await _bookingRefundableRepository.InsertAsync(bookingRefundableDetail).ConfigureAwait(false);
            _logger.LogInformation("Add Event Refunable Detail");
        }
    }
}
