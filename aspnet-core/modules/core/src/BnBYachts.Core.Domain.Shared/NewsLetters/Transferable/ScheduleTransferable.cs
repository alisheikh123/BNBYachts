using BnBYachts.Core.NewsLetters.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.NewsLetters.Transferable
{
    public class ScheduleTransferable
    {
        public long Id { get; set; }
        public long ContactID { get; set; }
        public long NewsLetterSubscriptionId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public StatusType StatusTypeId { get; set; }
        public List<string> EmailAddress { get; set; }
    }
}
