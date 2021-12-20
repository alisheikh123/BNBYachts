using System;

namespace BnBYachts.Shared.Interface
{
    public interface ITrackCreated
    {
        DateTimeOffset Created { get; set; }
        string CreatedBy { get; set; }
    }
}