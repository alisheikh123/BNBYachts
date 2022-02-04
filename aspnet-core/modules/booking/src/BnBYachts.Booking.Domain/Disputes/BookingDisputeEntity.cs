using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Disputes.Enums;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Disputes
{
    public class BookingDisputeEntity : AuditedAggregateRoot<int>
    {
        public int BookingId { get; set; }
        public BookingType BookingType { get; set; }
        public DisputeReasons DisputeReason { get; set; }
        public DisputeStatus Status { get; set; }
        public string Reason { get; set; }
    }
}
