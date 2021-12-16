using AutoMapper;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boats.Charter;
using System.Collections.Generic;
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
            CreateMap<BoatEntity, BoatDto>();
            CreateMap<CharterEntity, CharterDto>();
            CreateMap<CharterDto, CharterEntity>();
            
        }
    }
}
