using BnBYachts.Boats.Charter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat.Wishlists
{
   public class WishlistCharterEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public virtual int CharterId { get; set; }
        public CharterEntity Charter { get; set; }
        public virtual Guid UserId { get; set; }
    }
}
