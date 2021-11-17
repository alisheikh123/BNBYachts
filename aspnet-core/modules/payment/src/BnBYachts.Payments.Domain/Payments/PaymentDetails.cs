using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Payments.Payments
{
    public class PaymentDetails : AuditedAggregateRoot<Guid>
    {
        public string PaymentId { get; set; }
        public string BookingId { get; set; }
        public decimal  Amount { get; set; }
        public string CustomerId { get; set; }
    }
}

