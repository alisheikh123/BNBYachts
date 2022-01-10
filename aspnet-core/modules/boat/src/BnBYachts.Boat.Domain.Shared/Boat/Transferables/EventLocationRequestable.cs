using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class EventLocationRequestable
    {
            public int EventId { get; set; }
            public string Location { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
    }
}
