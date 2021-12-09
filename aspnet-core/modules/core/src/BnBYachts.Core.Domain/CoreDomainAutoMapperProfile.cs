using AutoMapper;
using BnBYachts.Core.Shared.Requestable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace BnBYachts.Core
{
    public class CoreDomainAutoMapperProfile: Profile
    {
        public CoreDomainAutoMapperProfile()
        {
            CreateMap<UserRequestable, IdentityUser>();
        }
    }
}
