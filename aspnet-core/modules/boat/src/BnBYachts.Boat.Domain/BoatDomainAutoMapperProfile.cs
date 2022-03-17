using AutoMapper;
using BnBYachts.Boat.Boat.Enum;
using BnBYachts.Boat.Boat.FeaturedCity;
using BnBYachts.Boat.Boat.Marketing;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Calendar;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Boat.Marketing.Requestable;
using BnBYachts.Boat.Marketing.Transferable;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Boat.Transferable;
using BnBYachts.Boat.Wishlist.Transferable;
using BnBYachts.Boat.Wishlists;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;
using Volo.Abp.AutoMapper;

namespace BnBYachts.Boat
{
    public class BoatDomainAutoMapperProfile : Profile
    {
        public BoatDomainAutoMapperProfile()
        {
            CreateMap<BoatGalleryRequestable, BoatGalleryEntity>();
            CreateMap<BoatFeaturesMapperRequestable, BoatFeatureEntity>();
            CreateMap<BoatRulesMapperRequestable, BoatRuleEntity>();
            CreateMap<BoatCalendarRequestable, BoatCalendarEntity>();
            CreateMap<FeaturesRequestable, FeatureEntity>();
            CreateMap<RulesRequestable, RuleEntity>();
            CreateMap<ChartersMapperRequestable, CharterEntity>();
            CreateMap<EventsMapperRequestable, EventEntity>();

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
            CreateMap<BoatEntity, BoatDTO>();
            CreateMap<BoatGalleryEntity, BoatGalleryDTO>();
            CreateMap<BoatFeatureEntity, BoatFeatureDTO>();
            CreateMap<BoatRuleEntity, BoatRuleDTO>();
            CreateMap<BoatLocationEntity, BoatFeatureDTO>();
            CreateMap<EventEntity, EventDTO>();

            CreateMap<BoatEntity, BoatDto>();
            CreateMap<CharterEntity, CharterDto>();
            CreateMap<CharterDto, CharterEntity>().ReverseMap();
            CreateMap<BoatEntity, BoatLookupTransferable>();
            CreateMap<BoatEntity, HostBoatRequestable>();
            CreateMap<BoatRuleEntity, BoatRuleDTO>();
            CreateMap<BoatLocationEntity, BoatFeatureDTO>();
            CreateMap<EventRequestable, EventEntity>();
            CreateMap<WishlistBoatEntity, WishlistTransferableDto>();
            CreateMap<WishlistCharterEntity, WishlistTransferableDto>();
            CreateMap<WishlistEventEntity, WishlistTransferableDto>();
            CreateMap<HostBoatRequestable, BoatEntity>();
            CreateMap<BoatFeaturesRequestable, BoatFeatureEntity>();
            CreateMap<BoatRulesRequestable, BoatRuleEntity>();
            CreateMap<EventEntity,EventRequestable>();
            CreateMap<CharterLocationRequestable, CharterEntity>();
            CreateMap<EventLocationRequestable, EventEntity>();
            CreateMap<EventEntity, EventRequestable>();
            CreateMap<CharterEntity, CalendarTransferable>()
                .ForMember(x => x.StartDate,
                    opt =>
                        opt.MapFrom(source => (source.DepartureFromDate)))

                .ForMember(x => x.EndDate,
                    opt =>
                        opt.MapFrom(source => (source.DepartureToDate)))
                           .ForMember(x => x.Name, opt => opt.MapFrom(source => (source.DepartingFrom + "-to-" + source.Destination)))
                            .ForMember(x => x.ServiceType, opt => opt.MapFrom(source => (ServiceType.Charter)))
                ;
            CreateMap<EventEntity, CalendarTransferable>()
    .ForMember(x => x.StartDate,
        opt =>
            opt.MapFrom(source => (source.StartDateTime)))
    .ForMember(x => x.EndDate,
        opt =>
            opt.MapFrom(source => (source.EndDateTime))).
            ForMember(x=>x.Name,opt=>opt.MapFrom(source=>(source.Title)))
            .ForMember(x => x.ServiceType, opt => opt.MapFrom(source => (ServiceType.Event)));
            CreateMap<BoatCalendarEntity, CalendarTransferable>().ForMember(x => x.StartDate, opt => opt.MapFrom(source => (source.FromDate)))
                .ForMember(x => x.Name, opt => opt.MapFrom(source => (source.Amount)))
                .ForMember(x => x.EndDate, opt => opt.MapFrom(source => (source.ToDate)));
            CreateMap<CalendarRequestableDto, BoatCalendarEntity>();
            CreateMap<BoatCalendarEntity, CalendarRequestableDto>();
            CreateMap<CharterEntity, CharterRequestable>().ReverseMap();
            CreateMap<EventEntity, EventAddResponseTransferable>();
            CreateMap<FeaturedCityRequestable, FeaturedCityEntity>().ReverseMap();
            CreateMap<FeaturedCityEntity,FeaturedCityTransferable> ().ReverseMap();
            CreateMap<MarketingRequestable, MarketingPageEntity>().ReverseMap();
            CreateMap<MarketingPageEntity, MarketingTransferable>().ReverseMap();

            CreateMap<BoatEventCalendarTransferable, BoatCalendarTransferableDTO>().ReverseMap();
        }
    }
}

