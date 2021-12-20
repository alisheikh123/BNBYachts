using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IHostBoatCalendarContract : IContractable
    {

        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public int? BoatEntityId { get; set; }
        public Guid? CreatorId { get; set; }
    }
    public class HostBoatCalendarContract : IHostBoatCalendarContract
    {

        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public int? BoatEntityId { get; set; }
        public Guid? CreatorId { get; set; }
    }
}
