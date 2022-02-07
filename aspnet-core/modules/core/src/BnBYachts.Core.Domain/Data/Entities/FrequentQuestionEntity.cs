using BnBYachts.Core.Enum;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Entities
{
    public class FrequentQuestionEntity : AuditedAggregateRoot<int>, ICoreAggregate
    {
        public QuestionCategory CategoryId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
