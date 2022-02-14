using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking.Transferables
{
   public class CharterBookingTransferableDto : ITransferable
    {
        public int? CharterId { get; set; }
        public DateTime DepartureDate { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public int? Reviews { get; set; }
        public string HostId { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public string UserName { get; set; }
        public bool? IsContract { get; set; }
        public int? ContractId { get; set; }
    }
}
