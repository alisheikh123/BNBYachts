using BnBYachts.Shared.Enums;
using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Requestable
{
    public class EntityBookingParamsDto : IRequestable
    {

        public BookingResponseFilter Filter { get; set; }
        public BookingType BookingType { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public Guid? UserId { get; set; }

    }
}
