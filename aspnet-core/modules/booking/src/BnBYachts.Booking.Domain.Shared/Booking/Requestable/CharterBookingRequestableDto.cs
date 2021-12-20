using BnBYachts.Shared.Interface;
using System;

namespace BnBYachts.Booking.Booking.Requestable
{
   public class CharterBookingRequestableDto: IRequestable
    {
        public int? CharterId { get; set; }
        public DateTime DepartureDate { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int? BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public BookingReviewRequestableDto Reviews { get; set; }
        public string HostId { get; set; }
        public BookingStatus BookingStatus { get; set; }
    }
}
