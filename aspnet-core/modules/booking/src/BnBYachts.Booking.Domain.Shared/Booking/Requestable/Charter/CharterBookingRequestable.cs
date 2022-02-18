using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Requestable.Charter
{
    public class CharterBookingRequestable
    {
        public int CharterId { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public int? Reviews { get; set; }
        public string HostId { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public string UserName { get; set; }
        public int? BoatId { get; set; }
    }
}
