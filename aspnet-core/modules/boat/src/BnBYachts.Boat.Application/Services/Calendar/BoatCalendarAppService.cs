using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Calendar;
using BnBYachts.Shared.Model;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Calendar
{
    public class BoatCalendarAppService : ApplicationService
    {
        private readonly IBoatCalendarManager _manager;
        public BoatCalendarAppService(IBoatCalendarManager manager)
        {
            _manager = manager;
        }
        public async Task<EntityResponseModel> GetBoatCalendar(int boatId, int month)
        => await _manager.GetBoatCalendar(CurrentUser.Id, month, boatId).ConfigureAwait(false);
        public async Task UpdateCalendar(CalendarRequestableDto calendar)
        => await _manager.UpdateBoatCalendar(calendar).ConfigureAwait(false);
        public async Task<EntityResponseModel> GetCalendar(int boatId, DateTime calendarDate)
        => await _manager.GetBoatCalendar(boatId, calendarDate).ConfigureAwait(false);

    }
}
