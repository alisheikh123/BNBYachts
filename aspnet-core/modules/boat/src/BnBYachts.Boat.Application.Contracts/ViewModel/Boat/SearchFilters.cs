using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.ViewModel.Boat
{
   public class SearchFilters
    {
        public string Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime? CheckinDate { get; set; }
        public DateTime? CheckoutDate { get; set; }
        public int Adults { get; set; }
        public int Childrens { get; set; }
    }
}
