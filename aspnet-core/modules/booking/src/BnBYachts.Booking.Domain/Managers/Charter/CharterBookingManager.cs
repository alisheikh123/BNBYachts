using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces.Charter;
using BnBYachts.Booking.Booking.Requestable.Charter;
using BnBYachts.Booking.DTO;
using BnBYachts.EventBusShared;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace BnBYachts.Booking.Managers.Charter
{
    public class CharterBookingManager : DomainService, ICharterBookingManager
    {
        private readonly IRepository<CharterBookingEntity> _charterBookingRepository;
        private readonly ILogger<ICharterBookingManager> _logger;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly IRepository<BookingCancelEntity> _charterCancelRepository;
        public CharterBookingManager(IRepository<CharterBookingEntity> charterBookingRepository, 
            ILogger<ICharterBookingManager> logger, 
            IObjectMapper<BookingDomainModule> objectMapper,
            IRepository<BookingCancelEntity> charterCancelRepository,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _charterBookingRepository = charterBookingRepository;
            _logger = logger;
            _objectMapper = objectMapper;
            _charterCancelRepository = charterCancelRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }
        public async Task<CharterBookingRequestable> GetCharterBookingById(long charterBookingId)
        {
            _logger.LogInformation("Get Charter Booking Detail By Id");
            return _objectMapper.Map<CharterBookingEntity, CharterBookingRequestable>(await _charterBookingRepository.GetAsync(x => x.Id == charterBookingId).ConfigureAwait(false));
        }
        public async Task CancelCharterBooking(BookingCancellationRequestableDto chartercancellationRequestable)
        {
                var charterBookingDetail = await _charterBookingRepository.GetAsync(x=>x.Id== chartercancellationRequestable.BookingId);
                charterBookingDetail.BookingStatus = BookingStatus.Cancel;
                await _charterCancelRepository.InsertAsync(_objectMapper.Map<BookingCancellationRequestableDto,BookingCancelEntity>(chartercancellationRequestable));
                _logger.LogInformation("Update Charter Cancellation Against this userId:" + _unitOfWorkManager.Current.Id.ToString());
        }
    }
}
