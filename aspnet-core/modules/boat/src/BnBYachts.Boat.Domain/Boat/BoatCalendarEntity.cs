using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class BoatCalendarEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public virtual int? BoatEntityId { get; set; }
    }
}
