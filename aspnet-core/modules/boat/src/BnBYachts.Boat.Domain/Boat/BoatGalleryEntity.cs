using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
   public class BoatGalleryEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public string Title { get; set; }
        public bool IsCoverPic { get; set; }
        public int SortOrder { get; set; }
        public string ImagePath { get; set; }
        public virtual int?  BoatEntityId { get; set; }
    }
}
