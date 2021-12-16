using BnBYachts.Shared.Interface;

namespace BnBYachts.Shared.Model
{
    public class EntityIdentifierModel<TKey> : IHaveIdentifier<TKey>
    {
        public TKey Id { get; set; }
    }
}