using AutoMapper;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Core.Shared.Requestable;
using BnBYachts.EventBusShared.Contracts;

namespace BnByachts.SeedObservable
{
    public class SeederObserverableAutoMapperProfile:Profile
    {
        public SeederObserverableAutoMapperProfile()
        {
            CreateMap<IHostBoatContract, HostBoatRequestable>();
            CreateMap<IHostBoatCalendarContract, BoatCalendarRequestable>();
            CreateMap<IHostBoatFeaturesContract, BoatFeaturesMapperRequestable>();
            CreateMap<IHostBoatRulesContract, BoatRulesMapperRequestable>();
            CreateMap<IHostBoatGalleryContract, BoatGalleryRequestable>();
            CreateMap<IFeatureContract, FeaturesRequestable>();
            CreateMap<IRuleContract, RulesRequestable>();
            CreateMap<IEventsContract, EventsMapperRequestable>();
            CreateMap<IChartersContract, ChartersMapperRequestable>();
            CreateMap<IUserContract, UserRequestable>();
        }

    }
}
