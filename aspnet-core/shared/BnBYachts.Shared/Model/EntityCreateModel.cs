using System;
using System.Text.Json.Serialization;
using BnBYachts.Shared.Interface;

namespace BnBYachts.Shared.Model
{
    public abstract class EntityCreateModel : ITrackCreated
    {
        [JsonIgnore]
        public DateTimeOffset Created { get; set; }
        [JsonIgnore]
        public string CreatedBy { get; set; }
    }
}