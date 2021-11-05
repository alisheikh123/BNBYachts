using AutoMapper;
using BnBYachts.Data.Model;
using BnBYachts.Dto;
using Volo.Abp.AutoMapper;

namespace BnBYachts
{
    public class BnBYachtsApplicationAutoMapperProfile : Profile
    {
        public BnBYachtsApplicationAutoMapperProfile()
        {
            //CreateMap<AppUser, AppUserDto>().Ignore(x => x.ExtraProperties);

            CreateMap<ForgetPasswordVerifier, ForgetPasswordVerifierDto>();
        }
    }
}
