using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class BoatRuleEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public RuleEntity OfferedRule { get; set; }
        public virtual int? BoatId { get; set; }
    }
}
