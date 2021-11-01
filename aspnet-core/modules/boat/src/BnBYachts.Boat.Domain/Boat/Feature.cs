using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class Feature : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public bool IsDefaultFeature { get; set; }
        public bool IsGuestFavourite { get; set; }
    }
}
