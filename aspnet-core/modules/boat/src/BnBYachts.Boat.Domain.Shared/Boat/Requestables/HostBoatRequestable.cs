using System;
using System.Collections.Generic;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
    public class HostBoatRequestable
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
        public int BoatType { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int PerDayCharges { get; set; }
        public bool IsActive { get; set; }
        public int TaxFee { get; set; }
        public Guid? CreatorId { get; set; }
        public ICollection<BoatGalleryRequestable> BoatGallery { get; set; }        
        public ICollection<BoatFeaturesRequestable> BoatFeatures { get; set; }
        public ICollection<BoatRulesRequestable> BoatRules { get; set; }
        public BoatCalendarRequestable BoatCalendar { get; set; }
    }

    public class BoatGalleryRequestable
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string FileData { get; set; }
        public string Title { get; set; }
        public int? SortOrder { get; set; }
        public string ImagePath { get; set; }
        public bool IsCoverPic { get; set; }
        public int BoatEntityId { get; set; }
    }
    public class BoatFeaturesRequestable
    {
        public int? Id { get; set; }
        public string Name{ get; set; }
        public bool isSafetyFeature { get; set; }
        public bool isDefaultFeature { get; set; }
        public bool isGuestFavourite { get; set; }
    }
    public class BoatFeaturesMapperRequestable
    {
        public int BoatEntityId { get; set; }
        public int OfferedFeaturesId { get; set; }
    }
    public class BoatRulesRequestable
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public bool isDefault { get; set; }

    }
    public class BoatRulesMapperRequestable
    {
        public  int BoatEntityId { get; set; }
        public  int OfferedRuleId { get; set; }

    }
    public class BoatCalendarRequestable
    {
        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public int? BoatEntityId { get; set; }
        public Guid? CreatorId { get; set; }

    }
    public class FeaturesRequestable
    {
        public string Name { get; set; }
        public bool IsDefaultFeature { get; set; }
        public bool IsGuestFavourite { get; set; }
        public bool IsSafetyFeature { get; set; }
        public string Icon { get; set; }

    }
    public class RulesRequestable
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }

    }
    public class EventsRequestable
    {
        public int NoOfGuests { get; set; }
        public DateTime EventDate { get; set; }
        public int PaymentStatus { get; set; }
        public string BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public int Reviews { get; set; }

    }
    public class ChartersRequestable
    {
        public DateTime DepartureDate { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public int PaymentStatus { get; set; }
        public string BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public int Reviews { get; set; }

    }
    public class ChartersMapperRequestable
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
    public class EventsMapperRequestable
    {
        public int BoatId { get; set; }
        public double LocationLat { get; set; }
        public double LocationLong { get; set; }
        public string Location { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int GuestCapacity { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int AmountPerPerson { get; set; }
        public Guid? CreatorId { get; set; }
        // public EventsType EventType { get; set; }

    }
   
  
}
