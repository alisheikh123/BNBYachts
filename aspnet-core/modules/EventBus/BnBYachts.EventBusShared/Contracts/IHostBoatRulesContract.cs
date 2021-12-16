using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IHostBoatRulesContract : IContractable
    {
        
        public int BoatEntityId { get; set; }
        public int OfferedRuleId { get; set; }
    }
    public class HostBoatRulesContract : IHostBoatRulesContract
    {
       
        public int BoatEntityId { get; set; }
        public int OfferedRuleId { get; set; }
    }
}
