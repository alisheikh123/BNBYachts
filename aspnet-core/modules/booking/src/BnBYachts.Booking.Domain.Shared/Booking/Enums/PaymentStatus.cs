using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking
{
    public enum PaymentStatus
    {
        Pending = 0,
        Approved = 1,
        Rejected = 2,
        Transfered = 3,
        Refund = 4
    }
}
