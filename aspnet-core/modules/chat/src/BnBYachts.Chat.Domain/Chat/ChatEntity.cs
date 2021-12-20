using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Chat.Chat
{
    public class ChatEntity : AuditedAggregateRoot<int>
    {
        public string ReceiverId { get; set; }
        public string SenderId { get; set; }
        public string Message { get; set; }
        public bool IsArchived { get; set; }
        public bool IsRead { get; set; }
        public DateTime ReadDate { get; set; }
        public DateTime SentDate { get; set; }
        public  int UserId { get; set; }
    }
}
