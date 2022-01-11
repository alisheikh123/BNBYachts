using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class EventLocationRequestable
    {
            public int Id { get; set; }
            public string Location { get; set; }
            public double LocationLat { get; set; }
            public double LocationLong { get; set; }
    }
}
