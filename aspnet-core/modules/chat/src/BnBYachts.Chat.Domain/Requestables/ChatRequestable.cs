using System.Collections.Generic;

namespace BnBYachts.Chat.Requestables
{
    public class ChatRequestable
    {
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
        public int MessageId { get; set; }
    }
}