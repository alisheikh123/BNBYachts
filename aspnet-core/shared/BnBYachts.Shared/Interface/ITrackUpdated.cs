using System;

namespace BnBYachts.Shared.Interface
{
    public interface ITrackUpdated
    {
        DateTimeOffset? Updated { get; set; }
        string UpdatedBy { get; set; }
    }
}