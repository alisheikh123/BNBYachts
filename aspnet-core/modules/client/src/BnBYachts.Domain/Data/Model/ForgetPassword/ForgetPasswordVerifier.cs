using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Data.Model
{
    public class ForgetPasswordVerifier : AuditedAggregateRoot<Guid>
    {
        public string UserId { get; set; }
        public string UniqueId { get; set; }
    }
}
