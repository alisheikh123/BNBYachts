using BnBYachts.Booking.Disputes.Enums;
using BnBYachts.Shared.Interface;

namespace BnBYachts.Booking.Disputes
{
    public class DisputeRequestableDto:IRequestable
    {
        public int BookingId { get; set; }
        public int ReasonId { get; set; }
        public int BookingType { get; set; }
        public string Reason { get; set; }
        public DisputeStatus Status { get; set; } = DisputeStatus.Pending;
    }
}
