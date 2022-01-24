using BnBYachts.Boat.Enum;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class BoatEntity : AuditedAggregateRoot<int>, IBoatAggregate
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
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int PerDayCharges { get; set; }
        public bool IsActive { get; set; }
        public int TaxFee { get; set; }
        public BoatTypes BoatType { get; set; }
        public ICollection<BoatGalleryEntity> BoatGalleries { get; set; }
        public ICollection<BoatCalendarEntity> BoatCalendars { get; set; }
        public ICollection<BoatFeatureEntity> BoatFeatures { get; set; }
        public ICollection<BoatRuleEntity> BoatRules { get; set; }
        public ICollection<BoatLocationEntity> BoatLocations { get; set; }
    }
}
