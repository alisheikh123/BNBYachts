using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Boat.Transferable;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;
using BnBYachts.Shared.Model;
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
        Task<ICollection<CharterEntity>> GetChartersByFilters(CharterSearchRequestable param);
        Task<CharterDetailsTransferable> GetCharterDetailsById(int charterId);
        Task<ICollection<EventEntity>> GetEventsByFilters(EventSearchRequestable param);
        Task<EventDetailTransferable> GetEventsDetailsById(int eventId);

        #region Host OnBoarding
        Task<HostLookupTransferable> GetHostOnBoardingLookup(Guid? userId);
        Task<BoatAddResponseTransferable> AddHostBoatManager(HostBoatRequestable boatDetails,Guid? userId);
        Task<bool> UpdateBoatLocation(BoatLocationRequestable boatDetails, Guid? userId);
        #endregion
        Task<bool> UpdateboatStatus(long boatId);
        Task<EntityResponseListModel<BoatDTO>> GetHostBoats(Guid? userId,int pageNo,int pageSize);
        Task<ICollection<FeatureEntity>> GetDefaultFeatures();
    }
}
