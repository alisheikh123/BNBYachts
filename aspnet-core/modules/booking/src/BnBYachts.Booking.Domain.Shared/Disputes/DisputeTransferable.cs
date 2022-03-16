using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Disputes.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Disputes
{
    public class DisputeTransferable
    {
        public int? id { get; set; }
        public int BookingId { get; set; }
        public string BookingType { get; set; }
        public string DisputeReason { get; set; }
        public DisputeStatus Status { get; set; }
        public string Reason { get; set; }
        public string CreatorId { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
