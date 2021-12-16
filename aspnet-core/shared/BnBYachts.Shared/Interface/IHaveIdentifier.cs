namespace BnBYachts.Shared.Interface
{
    public interface IHaveIdentifier<TKey>
    {
        TKey Id { get; set; }
    }
}