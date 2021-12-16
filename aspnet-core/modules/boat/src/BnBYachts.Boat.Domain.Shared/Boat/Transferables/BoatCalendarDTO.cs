using BnBYachts.Boat.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
   public class BoatCalendarDTO:ITransferable
    {
        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public virtual int? BoatEntityId { get; set; }
    }
}
