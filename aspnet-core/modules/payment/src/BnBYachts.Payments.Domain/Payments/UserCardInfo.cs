using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Payments.Payments
{
    public class UserCardInfo : AuditedAggregateRoot<Guid>
    {
        public string UserId { get; set; }
        public string CustomerId { get; set; }

    }
}
