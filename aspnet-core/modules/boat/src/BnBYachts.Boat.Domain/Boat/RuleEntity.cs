using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class RuleEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }
    }
}
