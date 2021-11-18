﻿using BnByachts.SharedModule.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Requestable
{
        public class HostBoatRequestable : IRequestable
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
        }
}
