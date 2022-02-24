using BnBYachts.Payments.Enum;

namespace BnBYachts.Payments.Shared.Transferable
{
    public class BookingPaymentRequestable
    {
        public string PaymentId { get; set; }
        public int? BookingId { get; set; }
        public bool? IsContract { get; set; }
        public string UserId { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public bool IsSaveNewPaymentMethod { get; set; }
        public string Token { get; set; }
        public BookingType BookingType { get; set; }
    }
}
