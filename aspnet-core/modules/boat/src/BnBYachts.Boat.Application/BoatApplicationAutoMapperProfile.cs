using AutoMapper;
using BnBYachts.Boat.Shared.Boat.Requestable;

namespace BnBYachts.Boat
{
    public class BoatApplicationAutoMapperProfile : Profile
    {
        public BoatApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            //CreateMap<BoatEntity, BoatDto>();
            CreateMap<BoatFeaturesRequestable, FeatureEntity>();
        }
    }
}
