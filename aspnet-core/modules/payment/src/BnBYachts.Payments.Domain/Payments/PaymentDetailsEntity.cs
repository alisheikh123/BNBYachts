using BnBYachts.Payments.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Payments.Payments
{
    public class PaymentDetailsEntity : AuditedAggregateRoot<int>
    {
        public string PaymentId { get; set; }
        public int BookingId { get; set; }
        public decimal  Amount { get; set; }
        public string CustomerId { get; set; }
        public BookingType BookingType { get; set; }
        public PaymentStatus Status { get; set; }
        public bool IsContract { get; set; }
    }
}

