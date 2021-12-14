using AutoMapper;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Events;
using Volo.Abp.AutoMapper;

namespace BnBYachts.Boat
{
    public class BoatDomainAutoMapperProfile:Profile
    {
        public BoatDomainAutoMapperProfile()
        {
            CreateMap<BoatGalleryRequestable, BoatGalleryEntity>();
            CreateMap<BoatFeaturesRequestable, BoatFeatureEntity>();
            CreateMap<BoatRulesRequestable, BoatRuleEntity>();
            CreateMap<BoatCalendarRequestable, BoatCalendarEntity>();
            CreateMap<BoatEntity, BoatLookupTransferable>();
            CreateMap<EventRequestable, EventEntity>();
            CreateMap<EventEntity, EventRequestable>();
            CreateMap<HostBoatRequestable, BoatEntity>()
                .ForMember(x => x.BoatGalleries,
                    opt =>
                        opt.MapFrom(source => (source.BoatGallery)))

                .ForMember(x => x.BoatFeatures,
                    opt =>
                        opt.MapFrom(source => (source.BoatFeatures)))
                .ForMember(x => x.BoatRules,
                    opt =>
                        opt.MapFrom(source => (source.BoatRules)))
                .Ignore(x => x.BoatCalendars);
                
            CreateMap<BoatEntity, HostBoatRequestable>();
        }
    }
}
