using BnBYachts.Boat.Marketing.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat.Boat.Marketing
{
    public class MarketingPageEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public MarketingType MarketingTypeId { get; set; }
        public string LocalLaws { get; set; }
    }
}
