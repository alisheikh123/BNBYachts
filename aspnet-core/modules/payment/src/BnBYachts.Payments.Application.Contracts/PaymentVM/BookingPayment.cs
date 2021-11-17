using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Payments.PaymentVM
{
    public class BookingPaymentVM
    {
        public string PaymentId { get; set; }
        public string UserId { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public bool IsSaveNewPaymentMethod { get; set; }
        public string Token { get; set; }
    }
}
