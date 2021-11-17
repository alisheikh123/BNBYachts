using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.ViewModel
{
    public class CharterFilters
    {
        public double DepartureLatitude { get; set; }
        public double DepartureLongitude { get; set; }
        public double DestinatipnLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public DateTime? DepartureDate { get; set; }
        public int? Adults { get; set; }
        public int? Childrens { get; set; }
    }
}
