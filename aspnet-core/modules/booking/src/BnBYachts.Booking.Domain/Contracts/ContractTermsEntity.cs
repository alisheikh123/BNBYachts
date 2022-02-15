using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Booking.Contracts
{
    public class ContractTermsEntity : AuditedAggregateRoot<int>
    {
        public string Title { get; set; }
        public string FileName{ get; set; }
        public virtual int? ContractEntityId { get; set; }
    }
}
