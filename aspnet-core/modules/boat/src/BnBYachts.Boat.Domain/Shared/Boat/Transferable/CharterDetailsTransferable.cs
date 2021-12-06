using BnBYachts.Boats.Charter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Transferable
{
   public class CharterDetailsTransferable
    {
        public CharterEntity charterDetails { get; set; }
        public ICollection<CharterAvailableDates> charterSchedule { get; set; }
    }

    public class CharterAvailableDates
    {
        public DateTime DepartureDate { get; set; }
        public int CharterId { get; set; }
    }
}
