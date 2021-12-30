using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Booking
{
   public  class BookingRefundableEntity: AuditedAggregateRoot<int>
    {
        public int BookingId { get; set; }
        public string DeductedAmount { get; set; }
        public string RefundableAmount { get; set; }
        public string UserId { get; set; }
        public bool isNotificationSent { get; set; }
        public string TotalAmount { get; set; }
    }
    
       
    
}
