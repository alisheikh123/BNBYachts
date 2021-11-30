using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
   public class BoatFeatureEntity : AuditedAggregateRoot<int>,IBoatAggregate
    {
        public FeatureEntity OfferedFeatures { get; set; }
        public virtual int? BoatId { get; set; }
    }
}
