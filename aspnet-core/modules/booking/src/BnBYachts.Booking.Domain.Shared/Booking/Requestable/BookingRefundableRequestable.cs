using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Requestable
{
    public class BookingRefundableRequestable: IRequestable
    {
        public int BookingId { get; set; }
        public string DeductedAmount { get; set; }
        public string RefundableAmount { get; set; }
        public string UserId { get; set; }
        public bool isNotificationSent { get; set; }
        public string TotalAmount { get; set; }
    }
}
