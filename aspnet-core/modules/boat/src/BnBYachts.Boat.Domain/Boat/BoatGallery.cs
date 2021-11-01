using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
   public class BoatGallery : AuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }
        public bool IsCoverPic { get; set; }
        public int SortOrder { get; set; }
        public string ImagePath { get; set; }
    }
}
