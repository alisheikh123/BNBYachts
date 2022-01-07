using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Calendar
{
    public class BoatCalendarAppService:ApplicationService
    {
        private readonly IBoatCalendarManager _manager;
        public BoatCalendarAppService(IBoatCalendarManager manager)
        {
            _manager = manager;
        }
        public async Task<EntityResponseModel> GetBoatCalendar(int boatId, int month)
        => await _manager.GetBoatCalendar(CurrentUser.Id, month, boatId).ConfigureAwait(false);
    }
}
