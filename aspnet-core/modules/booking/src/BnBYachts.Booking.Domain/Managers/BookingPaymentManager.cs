using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Interfaces;
using BnBYachts.Booking.Booking.Requestable;
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
    public class BookingPaymentManager : DomainService, IBookingPaymentManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventBookingRepository;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public BookingPaymentManager(IRepository<BoatelBookingEntity, int> boatelBookingRepository, IRepository<CharterBookingEntity, int> charterBookingRepository,
            IRepository<EventBookingEntity, int> eventBookingRepository, IObjectMapper<BookingDomainModule> objectMapper)
        {
            _boatelBookingRepository = boatelBookingRepository;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
            _objectMapper = objectMapper;
        }
        public async Task<EntityResponseListModel<UnPaidBookingsTransferable>> GetUnPaidBookings(string userId)
        {
            var listBookings = new List<UnPaidBookingsTransferable>();
            var boatelBookings = await _boatelBookingRepository.GetListAsync(res => res.HostId == userId && res.PaymentStatus == PaymentStatus.Approved
            && res.CheckoutDate < DateTime.Now).ConfigureAwait(false);
            var charterBookings = await _charterBookingRepository.GetListAsync(res => res.HostId == userId && res.PaymentStatus == PaymentStatus.Approved
            && res.ArrivalDate < DateTime.Now).ConfigureAwait(false);
            var eventBookings = await _eventBookingRepository.GetListAsync(res => res.HostId == userId && res.PaymentStatus == PaymentStatus.Approved
            && res.EventDate < DateTime.Now).ConfigureAwait(false);
            listBookings.AddRange(
                _objectMapper.Map<ICollection<BoatelBookingEntity>,ICollection<UnPaidBookingsTransferable>>(boatelBookings));
            listBookings.AddRange(
                _objectMapper.Map<ICollection<CharterBookingEntity>,ICollection<UnPaidBookingsTransferable>>(charterBookings));
            listBookings.AddRange(
                _objectMapper.Map<ICollection<EventBookingEntity>,ICollection<UnPaidBookingsTransferable>>(eventBookings));
            return new EntityResponseListModel<UnPaidBookingsTransferable>
            {
                Data = listBookings
            };
        }

        public async Task<EntityResponseModel> SetBookingPaid(ICollection<UnPaidBookingRequestable> data)
        {
            foreach (var elem in data)
            {
                if (elem.BookingType == (int)BookingType.Boatel)
                {
                    var entity = await _boatelBookingRepository.GetAsync(res => res.Id == elem.BookingId).ConfigureAwait(false);
                    entity.PaymentStatus = PaymentStatus.Transfered;
                }
                else if (elem.BookingType == (int)BookingType.Charter)
                {
                    var entity = await _charterBookingRepository.GetAsync(res => res.Id == elem.BookingId).ConfigureAwait(false);
                    entity.PaymentStatus = PaymentStatus.Transfered;
                }
                else if (elem.BookingType == (int)BookingType.Event)
                {
                    var entity = await _eventBookingRepository.GetAsync(res => res.Id == elem.BookingId).ConfigureAwait(false);
                    entity.PaymentStatus = PaymentStatus.Transfered;
                }
            }
            return new EntityResponseModel
            {
                ReturnStatus = true
            };
        }
    }
}
