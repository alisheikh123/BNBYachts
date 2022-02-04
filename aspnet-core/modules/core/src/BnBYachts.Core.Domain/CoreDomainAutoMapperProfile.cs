using AutoMapper;
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
            CreateMap<FrequentQuestionEntity, FrequentQuestionsDto>();
        }
    }
}
