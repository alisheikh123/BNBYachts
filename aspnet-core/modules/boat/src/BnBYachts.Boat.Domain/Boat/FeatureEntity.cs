using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class FeatureEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public string Name { get; set; }
        public bool IsDefaultFeature { get; set; }
        public bool IsGuestFavourite { get; set; }
        public bool IsSafetyFeature { get; set; }
        public string Icon{ get; set; }
        public virtual int  BoatId { get; set; }
    }
}
