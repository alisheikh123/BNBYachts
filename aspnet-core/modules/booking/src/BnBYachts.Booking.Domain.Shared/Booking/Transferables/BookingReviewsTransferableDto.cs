using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Transferables
{
   public class BookingReviewsTransferableDto
    {
        public string ReviewerId { get; set; }
        public int RevieweeID { get; set; }
        public string ReviewDescription { get; set; }
        public int Ratings { get; set; }
        public int BookingId { get; set; }
    }
}
