using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class FeatureEntity : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public bool IsDefaultFeature { get; set; }
        public bool IsGuestFavourite { get; set; }
        public bool IsSafetyFeature { get; set; }
        public string Icon{ get; set; }
    }
}
