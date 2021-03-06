using System;

namespace BnBYachts.Booking.Review
{
    public class ReviewTransferable
    {
        public string ReviewerId { get; set; }
        public string RevieweeID { get; set; }
        public string ReviewDescription { get; set; }
        public int Ratings { get; set; }
        public int? BookingId { get; set; }
        public int? boatId { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
