using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat.Wishlists
{
   public class WishlistBoatEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public virtual int BoatId { get; set; }
        public BoatEntity Boat { get; set; }
        public virtual Guid UserId { get; set; }
    }
}
