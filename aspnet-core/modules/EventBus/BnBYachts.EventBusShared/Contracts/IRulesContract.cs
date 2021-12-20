using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IRuleContract : IContractable
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }

    }
    public class RuleContract : IRuleContract
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }

    }
}
