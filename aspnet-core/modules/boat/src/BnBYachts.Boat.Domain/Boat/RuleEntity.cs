using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class RuleEntity : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }
    }
}
