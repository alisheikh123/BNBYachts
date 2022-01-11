using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Managers;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    [Authorize]
    public class BookingCalendarAppService : ApplicationService
    {
        private readonly BookingCalendarManager _manager;
        public BookingCalendarAppService(BookingCalendarManager manager)
        {
            _manager = manager;
        }
        public async Task<EntityResponseListModel<CalendarTransferable>> GetBoatelBookings()
            => await _manager.GetBoatelBookings(CurrentUser.Id).ConfigureAwait(false);

        public async Task<EntityResponseListModel<CalendarTransferable>> GetCharterBookings()
            => await _manager.GetCharterBookings(CurrentUser.Id).ConfigureAwait(false);

        public async Task<EntityResponseListModel<CalendarTransferable>> GetEventBookings()
            => await _manager.GetCharterBookings(CurrentUser.Id).ConfigureAwait(false);
        public async Task<EntityResponseModel> GetBoatBookingCalendar(int month, int boatId)
            => await _manager.GetBoatBookingCalendar(CurrentUser.Id.ToString(), month, boatId).ConfigureAwait(false);
    }
}
