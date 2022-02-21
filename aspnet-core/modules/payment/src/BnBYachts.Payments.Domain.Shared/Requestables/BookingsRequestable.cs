using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Payments.Requestables
{
    public class BookingsRequestable:IRequestable
    {
        public int BookingId { get; set; }
        public int BookingType { get; set; }
    }
}
