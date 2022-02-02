using BnBYachts.Core.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Entities
{
    public class FrequentQuestionEntity : AuditedAggregateRoot<int>
    {
        public QuestionCategory CategoryId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
