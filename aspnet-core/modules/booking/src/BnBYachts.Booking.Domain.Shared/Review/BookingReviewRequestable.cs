using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Review
{
    public class BookingReviewRequestable
    {
        public string ReviewerId { get; set; }
        public string RevieweeID { get; set; }
        public string ReviewDescription { get; set; }
        public int Ratings { get; set; }
        public int? boatId { get; set; }
        public int BookingId { get; set; }
    }
}
