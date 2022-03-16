using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Charter.Dto
{
    public class CharterCalendarTransferable
    {
        public List<DateTime> BookedDates { get; set; }
        public CharterCalendarTransferable()
        {
            BookedDates = new List<DateTime>();
        }
    }
}
