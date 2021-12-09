using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IFeatureContract : IContractable
    {

        public string Name { get; set; }
        public bool IsDefaultFeature { get; set; }
        public bool IsGuestFavourite { get; set; }
        public bool IsSafetyFeature { get; set; }
        public string Icon { get; set; }
    }
    public class FeatureContract : IFeatureContract
    {

        public string Name { get; set; }
        public bool IsDefaultFeature { get; set; }
        public bool IsGuestFavourite { get; set; }
        public bool IsSafetyFeature { get; set; }
        public string Icon { get; set; }
    }
}
