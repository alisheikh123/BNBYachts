using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Chat.Transferables
{
    public class ChatUserTransferable
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public virtual int? UnReadChatsCount { get; set; }
        public bool IsArchivedUser { get; set; }
        public bool IsBlocked { get; set; }
    }
}
