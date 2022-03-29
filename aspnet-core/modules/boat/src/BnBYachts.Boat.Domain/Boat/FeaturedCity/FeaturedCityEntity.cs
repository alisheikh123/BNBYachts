using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat.Boat.FeaturedCity
{
    public class FeaturedCityEntity : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public string imagePath { get; set; }
        public string Description { get; set; }
    }
}