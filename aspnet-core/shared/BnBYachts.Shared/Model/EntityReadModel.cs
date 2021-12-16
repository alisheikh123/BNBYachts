using System;
using BnBYachts.Shared.Interface;

namespace BnBYachts.Shared.Model
{
    public class EntityReadModel<TKey> : EntityIdentifierModel<TKey>, ITrackCreated, ITrackUpdated
    {
        public DateTimeOffset Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset? Updated { get; set; }
        public string UpdatedBy { get; set; }
    }
}