using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class BoatLocationEntity : AuditedAggregateRoot<int>
    {
        public string CurrentLat { get; set; }
        public string CurrentLong { get; set; }
        public string NextLocCity { get; set; }
        public string NextLocState { get; set; }
        public int NextLocZip { get; set; }
        public string NextLocCountry { get; set; }
    }
}
