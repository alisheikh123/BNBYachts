using BnBYachts.Core.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.Requestable
{
    public class FrequentQuestionsDto
    {
        public int Id { get; set; }
        public QuestionCategory CategoryId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
