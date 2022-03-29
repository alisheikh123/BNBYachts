using BnBYachts.Core.NewsLetters.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Entities.NewsLetters
{
    public class ScheduleNewsLetterEntity : AuditedAggregateRoot<long>
    {
        public long NewsLetterSubscriptionId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public StatusType StatusTypeId { get; set; }
        public NewsLetterSubscriptionEntity NewsLetterSubscription { get; set; }

    }
}
