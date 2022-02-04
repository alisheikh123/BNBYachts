using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Booking
{
    public class BookingEmailsTemplates : AuditedAggregateRoot<int>
    {
        public int TemplateId { get; set; }
        public string EmailContent { get; set; }
    }
}
