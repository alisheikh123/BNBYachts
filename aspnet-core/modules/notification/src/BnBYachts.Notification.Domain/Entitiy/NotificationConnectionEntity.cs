using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Notification.Entitiy
{
    public class NotificationConnectionEntity : AuditedAggregateRoot<Guid>
    {
        public NotificationConnectionEntity()
        {
            this.Id = new Guid();
        }

        public string UserId { get; set; }
        public string ConnectionId { get; set; }
    }
}
