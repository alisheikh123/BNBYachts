using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class BoatRuleEntity : AuditedAggregateRoot<int>
    {
        public RuleEntity OfferedRule { get; set; }
    }
}
