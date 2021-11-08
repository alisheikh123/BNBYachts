using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Contracts
{
    public class ContractTerms : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string AttachmentPath { get; set; }
        public virtual string ContractId { get; set; }
    }
}
