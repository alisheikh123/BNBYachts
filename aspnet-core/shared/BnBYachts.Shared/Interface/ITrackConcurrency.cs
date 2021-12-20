namespace BnBYachts.Shared.Interface
{
    public interface ITrackConcurrency
    {
        string RowVersion { get; set; }
    }
}