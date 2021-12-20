using AutoMapper;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;
using System.Collections.Generic;
using Volo.Abp.AutoMapper;

namespace BnBYachts.Boat
{
    public class BoatDomainAutoMapperProfile:Profile
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
            CreateMap<BoatEntity,BoatDTO>();
            CreateMap<BoatGalleryEntity, BoatGalleryDTO>();
            CreateMap<BoatFeatureEntity, BoatFeatureDTO>();
            CreateMap<BoatRuleEntity, BoatRuleDTO>();
            CreateMap<BoatLocationEntity, BoatFeatureDTO>();
            CreateMap<EventEntity, EventDTO>();

            CreateMap<BoatEntity, BoatDto>();
            CreateMap<CharterEntity, CharterDto>();
            CreateMap<CharterDto, CharterEntity>();
            CreateMap<BoatEntity, BoatLookupTransferable>();
            CreateMap<EventRequestable, EventEntity>();
        }
    }
}
