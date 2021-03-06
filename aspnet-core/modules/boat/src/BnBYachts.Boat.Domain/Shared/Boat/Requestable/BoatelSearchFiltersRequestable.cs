using System;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
   public  class BoatelSearchFiltersRequestable 
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
