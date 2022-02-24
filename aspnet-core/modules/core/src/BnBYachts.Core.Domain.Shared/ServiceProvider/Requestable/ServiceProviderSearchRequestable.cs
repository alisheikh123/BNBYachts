using BnBYachts.Core.Enum;
using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.ServiceProvider.Requestable
{
    public class ServiceProviderSearchRequestable : IRequestable
    {
        public string Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime? AvaliableDate { get; set; }
        public ServiceProviderType ServiceProviderType { get; set; }
    }
}
