using AutoMapper;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Core.Data.Entities;
using BnBYachts.Core.Requestable;
using BnBYachts.Core.Shared.Requestable;
using Volo.Abp.Identity;

namespace BnBYachts.Core
{
    public class CoreDomainAutoMapperProfile: Profile
    {
        public CoreDomainAutoMapperProfile()
        {
            CreateMap<UserRequestable, IdentityUser>();
            CreateMap<IdentityUser, BoatUserTransferable>().ReverseMap();
            CreateMap<FrequentQuestionEntity, FrequentQuestionsDto>();
        }
    }
}
