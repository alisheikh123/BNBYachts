using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Payments.Requestables
{
    public class StripePaymentRefundRequestable
    {
        public int BookingId { get; set; }
        public long RefundAmount { get; set; }
        public bool IsHost { get; set; }
        public int BookingType { get; set; }
    }
}
