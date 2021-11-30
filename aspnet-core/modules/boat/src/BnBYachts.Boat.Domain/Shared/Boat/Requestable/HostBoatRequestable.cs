using System;
using System.Collections.Generic;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
    public class HostBoatRequestable
    {
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
        public int BoatType { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int PerDayCharges { get; set; }
        public bool IsActive { get; set; }
        public int TaxFee { get; set; }
        public ICollection<BoatGalleryRequestable> BoatGallery { get; set; }        
        public ICollection<BoatFeaturesRequestable> BoatFeatures { get; set; }
        public ICollection<BoatRulesRequestable> BoatRules { get; set; }
        public BoatCalendarRequestable BoatCalendar { get; set; }
    }

    public class BoatGalleryRequestable
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string FileData { get; set; }
        public bool IsCoverPic { get; set; }
    }
    public class BoatFeaturesRequestable
    {
        public int? Id { get; set; }
        public string Name{ get; set; }
        public bool isSafetyFeature { get; set; }
        public bool isDefaultFeature { get; set; }
        public bool isGuestFavourite { get; set; }
    }
    public class BoatRulesRequestable
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public bool isDefault { get; set; }

    }
    public class BoatCalendarRequestable
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }
}
