﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Disputes
{
    public class DisputeTransferable
    {
        public int BookingId { get; set; }
        public string DisputeReason { get; set; }
        public string BookingType { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
