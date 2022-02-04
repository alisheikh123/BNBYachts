using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Disputes.Enums
{
    public enum DisputeStatus
    {
        Pending = 0,
        Resolved = 1,
        Hold = 2,
        CancelledByAdmin = 3,
        CancelledByHost = 4
    }
}
