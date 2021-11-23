using BnBYachts.Boat.Enum;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace BnBYachts.Boat
{
   public class BoatDto : AuditedEntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public int Length { get; set; }
        public int TotalBedrooms { get; set; }
        public int TotalWashrooms { get; set; }
        public bool IsBoatelServicesOffered { get; set; }
        public int BoatelAvailabilityDays { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int PerDayCharges { get; set; }
        public bool IsActive { get; set; }
        public BoatTypes BoatType { get; set; }
    }
}
