using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking
{
   public class BoatelBooking : AuditedAggregateRoot<Guid>
    {
        public DateTime CheckinDate { get; set; }
        public DateTime CheckoutDate { get; set; }
        public BookingStatus BookingStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public string BoatId { get; set; }
        public string BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public Review Reviews { get; set; }
        public string HostId { get; set; }
    }
}
