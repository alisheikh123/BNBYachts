using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Contracts
{
    public class ContractEntity : AuditedAggregateRoot<Guid>
    {
        public ServiceType ServiceType { get; set; }
        public int NoOfGuests { get; set; }
        public string Description { get; set; }
        public string DepartureFrom { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsRoundTrip { get; set; }
        public int BoatCapacity { get; set; }
        public int QouteAmount { get; set; }
        public int ReturnTo { get; set; }
        public virtual string ServiceProviderId { get; set; }
        public virtual string HostId { get; set; }
        public virtual string ChatId { get; set; }
        public ICollection<ContractTermsEntity> ContractTerms { get; set; }

    }
}
