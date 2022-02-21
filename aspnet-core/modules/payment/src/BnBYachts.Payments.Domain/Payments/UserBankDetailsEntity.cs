using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Payments.Payments
{
    public class UserBankDetailsEntity : AuditedAggregateRoot<int>
    {
        public string AccountId { get; set; }
        public string BankId { get; set; }
        public string UserId { get; set; }
        public bool IsContract { get; set; }
    }
}
