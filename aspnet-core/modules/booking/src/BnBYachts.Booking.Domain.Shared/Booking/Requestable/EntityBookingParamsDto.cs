using BnBYachts.Shared.Enums;
using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Requestable
{
    public class EntityBookingParamsDto : IRequestable
    {

        public BookingResponseFilter filter { get; set; }
        public BookingType bookingType { get; set; }
        public string month { get; set; }
        public string year { get; set; }
        public int pageNo { get; set; }
        public int pageSize { get; set; }
        public Guid? userId { get; set; }

    }
}
