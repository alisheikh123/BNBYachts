using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Transferables
{
   public class BoatelBookingTransferableDto:ITransferable
    {
        public int Id { get; set; }
        public DateTime CheckinDate { get; set; }
        public DateTime CheckoutDate { get; set; }
        public string CheckinTime { get; set; }
        public string CheckoutTime { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public int BoatId { get; set; }
        public string UserId { get; set; }
        public BookingReviewsTransferableDto Reviews { get; set; }
        public string HostId { get; set; }
        public string UserName { get; set; }
    }
}
