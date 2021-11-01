using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
   public class BoatFeature : AuditedAggregateRoot<Guid>
    {
        public Feature OfferedFeatures { get; set; }
    }
}
