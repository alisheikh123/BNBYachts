using System;
using System.Text.Json.Serialization;
using BnBYachts.Shared.Interface;

namespace BnBYachts.Shared.Model
{
    public abstract class EntityUpdateModel : ITrackUpdated
    {
        [JsonIgnore]
        public DateTimeOffset? Updated { get; set; }
        [JsonIgnore]
        public string UpdatedBy { get; set; }
    }

    public abstract class EntityUpdateModel<TKey> : EntityIdentifierModel<TKey>, ITrackUpdated
    {
        [JsonIgnore]
        public DateTimeOffset? Updated { get; set; } = DateTimeOffset.UtcNow;
        [JsonIgnore]
        public string UpdatedBy { get; set; }
    }
}