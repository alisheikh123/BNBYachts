using BnBYachts.Core.Enum;
using BnBYachts.Shared.Interface;

namespace BnBYachts.Core.Requestable
{
    public class FrequentQuestionsDto:IRequestable
    {
        public int Id { get; set; }
        public QuestionCategory CategoryId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
