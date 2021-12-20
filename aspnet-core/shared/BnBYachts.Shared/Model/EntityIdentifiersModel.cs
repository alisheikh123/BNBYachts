using System.Collections.Generic;

namespace BnBYachts.Shared.Model
{
    public class EntityIdentifiersModel<TKey>
    {
        public IReadOnlyCollection<TKey> Ids { get; set; }
    }
}