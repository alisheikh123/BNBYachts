using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Contracts
{
    public class ContractEntity : AuditedAggregateRoot<int>
    {
        public ServiceType ServiceType { get; set; }
        public int NoOfGuests { get; set; }
        public string Description { get; set; }
        public string DepartureFrom { get; set; }
        public string Destination { get; set; }
        public DateTime EventDateTime { get; set; }
        public string EventLocation { get; set; }
        public DateTime DepartureDate { get; set; }
        public string TerminationClause { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsRoundTrip { get; set; }
        public int BoatCapacity { get; set; }
        public string EventTitle { get; set; }
        public int QouteAmount { get; set; }
        public int? ServiceProviderId { get; set; }
        public virtual string HostId { get; set; }
        public ICollection<ContractTermsEntity> ContractTerms { get; set; }
        public string UserId { get; set; }
        public ContractsStatus Status { get; set; }
        public string RejectionReason { get; set; }
        public int?  NoOfDays { get; set; }
        public string BoatelLocation { get; set; }
        public int BoatId { get; set; }
        public int? EventId { get; set; }
        public int? CharterId { get; set; }
        public bool IsCustomType { get; set; }

    }
}
