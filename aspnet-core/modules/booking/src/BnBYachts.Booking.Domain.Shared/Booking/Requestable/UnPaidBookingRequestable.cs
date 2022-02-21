using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Requestable
{
    public class UnPaidBookingRequestable:IRequestable
    {
        public int BookingId { get; set; }
        public int BookingType { get; set; }
    }
}
