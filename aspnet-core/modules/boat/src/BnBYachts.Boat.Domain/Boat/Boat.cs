using BnBYachts.Boat.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class HostBoat : AuditedAggregateRoot<Guid>
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
        public BoatTypes BoatType { get; set; }
        public List<BoatGallery> BoatGalleries { get; set; }
        public List<BoatCalendar> BoatCalendars { get; set; }
        public List<BoatFeature> BoatFeatures { get; set; }
        public List<BoatRule> BoatRules { get; set; }
        public List<BoatLocation> BoatLocations { get; set; }
    }
}
