using BnBYachts.Booking.BackgroundJobs;
using BnBYachts.Booking.Booking;
using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Booking.BackgroundJobsManager
{
    public class BookingJobsManager:DomainService, IBookingJobsManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        private readonly IRepository<CharterBookingEntity, int> _charterBookingRepository;
        private readonly IRepository<EventBookingEntity, int> _eventBookingRepository;
        public BookingJobsManager(IRepository<CharterBookingEntity, int> charterBookingRepository,
            IRepository<BoatelBookingEntity, int> repository, IRepository<EventBookingEntity, int> eventBookingRepository)
        {
            _boatelBookingRepository = repository;
            _charterBookingRepository = charterBookingRepository;
            _eventBookingRepository = eventBookingRepository;
        }
        public async Task RejectPendingBookings()
        {
            //Boatels Bookings
            var pendingPastBoatelBookings = await _boatelBookingRepository.GetListAsync(res => res.BookingStatus == BookingStatus.Pending && (res.CreationTime - DateTime.Now).TotalHours >= 24);
            foreach (var booking in pendingPastBoatelBookings)
            {
                booking.BookingStatus = BookingStatus.Rejected;
            }
            //Charter Bookings
            var pendingPastChartereBookings = await _charterBookingRepository.GetListAsync(res => res.BookingStatus == BookingStatus.Pending && (res.CreationTime - DateTime.Now).TotalHours >= 24);
            foreach (var booking in pendingPastChartereBookings)
            {
                booking.BookingStatus = BookingStatus.Rejected;
            }
            //Boatels Bookings
            var pendingPastEventsBookings = await _eventBookingRepository.GetListAsync(res => res.BookingStatus == BookingStatus.Pending && (res.CreationTime - DateTime.Now).TotalHours >= 24);
            foreach (var booking in pendingPastEventsBookings)
            {
                booking.BookingStatus = BookingStatus.Rejected;
            }
        }

    }
}
