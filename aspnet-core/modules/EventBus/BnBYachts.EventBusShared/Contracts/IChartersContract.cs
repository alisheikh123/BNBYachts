using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IChartersContract : IContractable
    {

        public int? BoatId { get; set; }
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
        public Guid? CreatorId { get; set; }
    }
    public class ChartersContract : IChartersContract
    {
        public int? BoatId { get; set; }
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
        public Guid? CreatorId { get; set; }
    }
}
