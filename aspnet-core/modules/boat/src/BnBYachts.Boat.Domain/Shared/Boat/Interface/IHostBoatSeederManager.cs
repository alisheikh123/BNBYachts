using BnBYachts.Boat.Shared.Boat.Requestable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Interface
{
    public interface IHostBoatSeederManager
    {
        Task<HostBoatRequestable> InsertBoat(HostBoatRequestable input);
        Task<BoatGalleryRequestable> InsertBoatGallery(BoatGalleryRequestable input);
        Task<BoatFeaturesMapperRequestable> InsertBoatFeatures(BoatFeaturesMapperRequestable input);
        Task<BoatRulesMapperRequestable> InsertBoatRules(BoatRulesMapperRequestable input);
        Task<BoatCalendarRequestable> InsertBoatCalendar(BoatCalendarRequestable input);
        Task<FeaturesRequestable> InsertFeatures(FeaturesRequestable input);
        Task<RulesRequestable> InsertRules(RulesRequestable input);
        Task<EventsMapperRequestable> InsertEvents(EventsMapperRequestable input);
        Task<ChartersMapperRequestable> InsertCharters(ChartersMapperRequestable input);
    }
}
