using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Contracts
{
    public class ContractsRequestable :IRequestable
    {
        public int? Id { get; set; }
        public ServiceType ServiceType { get; set; }
        public int NoOfGuests { get; set; }
        public string Description { get; set; }
        public string DepartureFrom { get; set; }
        public string Destination { get; set; }
        public DateTime? EventDateTime { get; set; }
        public string EventTitle { get; set; }
        public string TerminationClause { get; set; }
        public string EventLocation { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool IsRoundTrip { get; set; }
        public int? BoatCapacity { get; set; }
        public int BoatId { get; set; }

        public int? QouteAmount { get; set; }
        public virtual string ServiceProviderId { get; set; }
        public virtual string HostId { get; set; }
        public virtual string UserId { get; set; }
        public string UserName { get; set; }
        public ContractsStatus? Status { get; set; } = ContractsStatus.Pending;
    }
    public class ContractAttachmentRequestable
    {
        public string FileName { get; set; }
        public string Title { get; set; }
        public int ContractEntityId { get; set; }
    }
}
