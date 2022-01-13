using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Boat.Interfaces
{
    public interface IBoatCalendarManager
    {
        Task<EntityResponseModel> GetBoatCalendar(Guid? hostId,int month,int boatId);
    }
}
