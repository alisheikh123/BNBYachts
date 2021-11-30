using BnBYachts.Boat.Shared.Boat.Requestable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Interface
{
    public interface IHostBoatManager
    {
        Task<HostBoatRequestable> Insert(HostBoatRequestable input);
        Task<ICollection<BoatEntity>> GetBoatelsByFilters(BoatelSearchFiltersRequestable param);
        Task<bool> BoatCalendarUpdate(BoatCalendarEntity boatCalendar, Guid? userId);
        Task<BoatEntity> GetBoatDetailsById(int boatId);
        Task<bool> UpdateboatStatus(long boatId,bool IsActive);
        Task<ICollection<BoatEntity>> GetHostBoats(Guid? userId);
    }
}
