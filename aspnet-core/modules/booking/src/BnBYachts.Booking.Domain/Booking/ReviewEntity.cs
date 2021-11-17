using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking
{
    public class ReviewEntity : AuditedAggregateRoot<int>
    {
        public string ReviewerId { get; set; }
        public string RevieweeID { get; set; }
        public string ReviewDescription { get; set; }
        public int Ratings { get; set; }
    }
}
