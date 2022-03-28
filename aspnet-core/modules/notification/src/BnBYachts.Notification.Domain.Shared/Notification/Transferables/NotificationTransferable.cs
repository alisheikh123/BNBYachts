using System;

namespace BnBYachts.Notification.Notification.Transferables
{
    public class NotificationTransferable
    {
        public NotificationType NotificationType { get; set; }
        public Guid? UserTo { get; set; }
        public Guid? UserFrom { get; set; }
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
    }
}
