
using System;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface INotificationContract: IContractable
    {
        public string UserTo { get; set; }
        public string UserFrom { get; set; }
        public int? ChatId { get; set; }
        public int? RequestQuoteId { get; set; }
        public int? PaymentId { get; set; }
        public int? EventId { get; set; }
        public string RoleName { get; set; }
        public int? BookingId { get; set; }
        public int? DisputeId { get; set; }
        public int? ContractId { get; set; }
        public int? CharterId { get; set; }
        public string Description { get; set; }
        public bool IsSeen { get; set; }
        public int? BoatId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public NotificationType NotificationType { get; set; }
    }

    public class NotificationContract:INotificationContract
    {
        public string UserTo { get; set; }
        public string UserFrom { get; set; }
        public int? ChatId { get; set; }
        public int? RequestQuoteId { get; set; }
        public int? PaymentId { get; set; }
        public int? EventId { get; set; }
        public string RoleName { get; set; }
        public int? BookingId { get; set; }
        public int? DisputeId { get; set; }
        public int? ContractId { get; set; }
        public int? CharterId { get; set; }
        public string Description { get; set; }
        public bool IsSeen { get; set; }
        public int? BoatId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public NotificationType NotificationType { get; set; }
    }

    public enum NotificationType
    {
        Dispute = 0,
        ReservationCancellation = 1,
        ReservationRejected = 2,
        ReservationApproved = 3,
        ChatRequest = 4,
        BookingReminder = 5,
        Review = 6,
        Refund = 7,
        Deduction = 8,
        AcceptContract = 9,
        RejectContract = 10,
        PaymentOnHold = 11,
        ContactUs = 12,
        BookingRequest = 13,
        RequestQuote = 14
    }
}
