using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Boat.Transferable;
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

        #region Host OnBoarding
        Task<HostLookupTransferable> GetHostOnBoardingLookup(Guid? userId);
        Task<bool> AddHostBoatManager(HostBoatRequestable boatDetails,Guid? userId);
        #endregion
        Task<bool> UpdateboatStatus(long boatId);
        Task<ICollection<BoatEntity>> GetHostBoats(Guid? userId);
    }
}
