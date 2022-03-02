using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Shared.Interface;
namespace BnBYachts.Core.ServiceProvider.Requestable
{
    public class TimeSlotRequestableDto : IRequestable
    {
        public int ServiceProviderId { get; set; }
        public DateTime Time { get; set; }
    }
}
