using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace BnBYachts.Booking.DTO
{
    public class BoatelBookingDto : AuditedEntityDto<int>
    {
        public DateTime CheckinDate { get; set; }
        
        public DateTime CheckoutDate { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public int BoatId { get; set; }
        public string BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
    }
}
