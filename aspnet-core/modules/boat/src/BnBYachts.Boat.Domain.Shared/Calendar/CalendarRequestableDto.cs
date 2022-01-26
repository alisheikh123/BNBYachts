using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Calendar
{
    public class CalendarRequestableDto:IRequestable
    {
        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public virtual int? BoatEntityId { get; set; }
        public int Amount { get; set; }
        public string Notes { get; set; }
    }
}
