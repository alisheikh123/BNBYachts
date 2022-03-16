using BnBYachts.Booking.Disputes.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Disputes
{
    public class ChangeStatusRequestable
    {
        public int Id { get; set; }
        public DisputeStatus status { get; set; }
    }
}
