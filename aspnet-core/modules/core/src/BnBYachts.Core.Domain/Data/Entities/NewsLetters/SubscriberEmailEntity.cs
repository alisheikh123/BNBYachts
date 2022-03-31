using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Entities.NewsLetters
{
    public class SubscriberEmailEntity : AuditedAggregateRoot<long>
    {
        public string EmailAddress { get; set; }
        public long NewsLetterSubscriptionId { get; set; }
        public NewsLetterSubscriptionEntity NewsLetterSubscription { get; set; }
    }
}
