using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace BnBYachts.Dto
{
    public class ForgetPasswordVerifierDto : AuditedEntityDto<Guid>
    {
        public string UserId { get; set; }
        public string UniqueId { get; set; }
    }
}
