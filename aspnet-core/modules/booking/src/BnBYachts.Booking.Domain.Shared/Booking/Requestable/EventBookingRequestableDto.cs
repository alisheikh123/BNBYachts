using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Requestable
{
    public class EventBookingRequestableDto : IRequestable
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public int NoOfGuests { get; set; }
        public DateTime EventDate { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public int? ReviewsId { get; set; }
        public string HostId { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public string UserName { get; set; }
        public int? BoatId { get; set; }

    }
}
