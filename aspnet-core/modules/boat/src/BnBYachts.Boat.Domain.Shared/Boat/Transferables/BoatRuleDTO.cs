using BnBYachts.Boat.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class BoatRuleDTO:ITransferable
    {
        public virtual int? BoatEntityId { get; set; }
        public virtual int? OfferedRuleId { get; set; }
    }
}
