using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
    public class CharterSearchRequestable
    {
        public string DepartureLoc { get; set; }
        public string DestinationLoc { get; set; }
        public double DepartureLatitude { get; set; }
        public double DepartureLongitude { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public DateTime? DepartureDate { get; set; }
        public int Adults { get; set; }
        public int Childrens { get; set; }
    }
}
