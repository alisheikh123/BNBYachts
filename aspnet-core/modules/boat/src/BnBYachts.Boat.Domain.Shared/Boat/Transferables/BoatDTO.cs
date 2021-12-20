using BnBYachts.Boat.Enum;
using BnBYachts.Boat.Interface;
using System;
using System.Collections.Generic;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class BoatDTO : ITransferable
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Length { get; set; }
        public int TotalBedrooms { get; set; }
        public int TotalWashrooms { get; set; }
        public bool IsBoatelServicesOffered { get; set; }
        public int? BoatelCapacity { get; set; }
        public int BoatelAvailabilityDays { get; set; }
        //public int BoatType { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int PerDayCharges { get; set; }
        public bool IsActive { get; set; }
        public int TaxFee { get; set; }
        public Guid? CreatorId { get; set; }
        public DateTime CreationTime { get; set; }
        public BoatTypes BoatType { get; set; }
        public ICollection<BoatGalleryDTO> BoatGalleries { get; set; }
        public ICollection<BoatFeatureDTO> BoatFeatures { get; set; }
        public ICollection<BoatRuleDTO> BoatRules { get; set; }
        public ICollection<BoatLocationDTO> BoatLocations { get; set; }
    }
}
