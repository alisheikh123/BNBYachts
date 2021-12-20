using BnBYachts.Shared.Interface;
using System;


namespace BnBYachts.Booking.Booking.Requestable
{
    public class BoatelBookingRequestableDto:IRequestable
    {
        public int? Id { get; set; }
        public DateTime CheckinDate { get; set; }
        public DateTime CheckoutDate { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public int BoatId { get; set; }
        public string UserId { get; set; }
        public BookingReviewRequestableDto Reviews { get; set; }
        public string HostId { get; set; }
        public string UserName { get; set; }
    }
}
