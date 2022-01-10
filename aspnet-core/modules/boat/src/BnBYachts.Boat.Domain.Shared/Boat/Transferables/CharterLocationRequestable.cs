using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
    public class CharterLocationRequestable
    {
        public int CharterId { get; set; }
        public string DepartureFromLocation { get; set; }
        public string DestinationLocation { get; set; }
        public double DepartureLatitude { get; set; }
        public double DepartureLongitude { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
    }
}
