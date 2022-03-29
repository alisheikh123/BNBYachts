using BnBYachts.Core.NewsLetters.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Entities.NewsLetters
{
    public class NewsLetterSubscriptionEntity : AuditedAggregateRoot<long>
    {
        public string Title { get; set; }
        public string LetterImage { get; set; }
        public string Description { get; set; }
        public LetterType LetterTypeId { get; set; }
    }
}
