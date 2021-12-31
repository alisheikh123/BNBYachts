using BnBYachts.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat.Wishlists
{
    public class WishlistEventEntity:AuditedAggregateRoot<int>, IBoatAggregate
    {
        public virtual int EventId { get; set; }
        public EventEntity Event{ get; set; }
        public virtual Guid UserId { get; set; }
    }
}
