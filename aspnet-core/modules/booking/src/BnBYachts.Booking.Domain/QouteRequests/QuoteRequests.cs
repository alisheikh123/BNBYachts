using BnBYachts.Booking.QuoteRequests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.QouteRequests
{
    public class QuoteRequests : AuditedAggregateRoot<Guid>
    {
        public QuoteTypes QuoteType { get; set; }
        public int NoOfGuests { get; set; }
        public string DepartureFrom { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime EventDateTime { get; set; }
        public bool IsRoundTrip { get; set; }
        public string OtherRequirments { get; set; }
        public virtual string HostId { get; set; }
        public virtual string ChatId { get; set; }

    }
}
