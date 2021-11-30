using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Transferable
{
    public class HostLookupTransferable
    {
        public ICollection<RuleEntity> Rules { get; set; }
        public ICollection<FeatureEntity> Features { get; set; }
        internal HostLookupTransferable()
        {
        }

        internal HostLookupTransferable(ICollection<RuleEntity> rules, ICollection<FeatureEntity> features)
        {
            Features = features;
            Rules = rules;
        }
    }
    public static class HostLookupFactory
    {
        public static HostLookupTransferable Contruct(ICollection<RuleEntity> rules, ICollection<FeatureEntity> features)
        {
            return new HostLookupTransferable(rules,features);
        }
    }

}

