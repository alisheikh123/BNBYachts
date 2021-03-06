using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Booking
{
    public class BookingCancelled:AuditedAggregateRoot<Guid>
    {
        public string BookingId { get; set; }
        public int BookingType { get; set; }
        public string Reason { get; set; }
        public string UserId { get; set; }
        public bool isNotificationSent { get; set; }
        
        public string RefundAmount { get; set; }
        public string TotalAmount { get; set; }
    }
}
