using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
    public class EventSearchRequestable
    {
        public string Location { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public DateTime? EventDate { get; set; }
        public int Adults { get; set; }
        public int Childrens { get; set; }
        public int EventType { get; set; }
    }
}
