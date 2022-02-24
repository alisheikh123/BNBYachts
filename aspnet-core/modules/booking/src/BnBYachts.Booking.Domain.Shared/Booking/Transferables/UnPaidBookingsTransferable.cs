using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Transferables
{
    public class UnPaidBookingsTransferable:ITransferable
    {
        public int BookingId { get; set; }
        public int BookingType { get; set; }
    }
}
