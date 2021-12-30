using BnBYachts.Boat.Boat.Transferables;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Charter.Dto
{
    public class CharterDto
    {
        public int Id { get; set; }
        public bool IsRoundTrip { get; set; }
        public int GuestCapacity { get; set; }
        public string Description { get; set; }
        public DateTime DepartureFromDate { get; set; }
        public DateTime DepartureToDate { get; set; }
        public int CharterFee { get; set; }
        public bool IsFullBoatCharges { get; set; }
        public string DepartingFrom { get; set; }
        public double DepartingLatitude { get; set; }
        public double DepartingLongitude { get; set; }
        public string Destination { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string ReturnAddress { get; set; }
        public double? ReturnLocationLat { get; set; }
        public double? ReturnLocationLng { get; set; }
        public virtual int? BoatId { get; set; }
        public virtual BoatDTO Boat { get; set; }
    }
}
