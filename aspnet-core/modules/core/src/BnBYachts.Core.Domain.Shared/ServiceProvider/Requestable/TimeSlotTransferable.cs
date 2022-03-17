using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.ServiceProvider.Requestable
{
   public class TimeSlotTransferable
    {
        public int Id { get; set; }
        public int ServiceProviderId { get; set; }
        public DateTime Time { get; set; }
    }
}
