using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Chat.Chat
{
    public class ChatRoom : AuditedAggregateRoot<int>
    {
        public ChatEntity ChatEntity { get; set; }
    }
}
