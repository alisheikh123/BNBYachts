using BnBYachts.Booking.Booking;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace BnBYachts.Booking.DTO
{
    public class BookingCancellationDto 
    {
        public int BookingId { get; set; }
        public int BookingType { get; set; }
        public string Reason { get; set; }
        public string UserId { get; set; }
        public bool isNotificationSent { get; set; }

        public BookingStatus BookingStatus { get; set; }
        public string RefundAmount { get; set; }
        public string TotalAmount { get; set; }
    }
}
