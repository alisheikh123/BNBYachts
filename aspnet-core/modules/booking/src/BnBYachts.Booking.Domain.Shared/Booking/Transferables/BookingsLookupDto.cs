using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Transferables
{
    public class BookingsLookupDto: ITransferable
    {
        public int Id { get; set; }
        public BookingType BookingType { get; set; }
        public int BookingTypeId { get; set; }
    }
}
