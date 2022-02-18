using AutoMapper;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Core.Data.Entities;
using BnBYachts.Core.Requestable;
using BnBYachts.Core.Data.Model.VerifyPhoneNumber;
using BnBYachts.Core.Shared.Requestable;
using Volo.Abp.Identity;

namespace BnBYachts.Core
{
    public class CoreDomainAutoMapperProfile: Profile
    {
        public CoreDomainAutoMapperProfile()
        {
            CreateMap<UserRequestable, IdentityUser>();
            CreateMap<IdentityUser, BoatUserTransferable>();
            CreateMap<UserMobileVerificationRequestable, OTPVerifierEntity>().
                ForMember(source=>source.PhoneNumber,destination=>destination.MapFrom(source=> source.Phone));
            CreateMap<OTPVerifierEntity, UserMobileVerificationRequestable>().
                ForMember(source => source.Phone, destination => destination.MapFrom(source => source.PhoneNumber));
            CreateMap<FrequentQuestionEntity, FrequentQuestionsDto>();
        }
    }
}
