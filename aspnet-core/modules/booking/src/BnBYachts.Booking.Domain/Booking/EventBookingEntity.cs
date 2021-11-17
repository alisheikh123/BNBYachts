using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Booking
{
   public class EventBookingEntity : AuditedAggregateRoot<int>
    {
        public string EventId { get; set; }
        public int NoOfGuests { get; set; }
        public DateTime EventDate { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public ReviewEntity Reviews { get; set; }
    }
}
