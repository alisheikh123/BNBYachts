using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking
{
    public class CharterBookingEntity : AuditedAggregateRoot<int>
    {
        public int CharterId { get; set; }
        public DateTime DepartureDate { get; set; }
        public int NoOfAdults { get; set; }
        public int NoOfChildrens { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int BankingDetailsId { get; set; }
        public string UserId { get; set; }
        public BookingReviewEntity Reviews { get; set; }
        public string HostId { get; set; }
        public BookingStatus BookingStatus { get; set; }
    }
}
