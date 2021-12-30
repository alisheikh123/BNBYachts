using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Chat.Transferables
{
    public class ChatTransferable
    {
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
    }
    public class ChatMessagesTransferable
    {
        public ICollection<ChatTransferable> Chats { get; set; }
        public bool IsBlockedUser { get; set; }
        public ChatMessagesTransferable()
        {
            Chats = new HashSet<ChatTransferable>();
            IsBlockedUser = false;
        }
    }
}
