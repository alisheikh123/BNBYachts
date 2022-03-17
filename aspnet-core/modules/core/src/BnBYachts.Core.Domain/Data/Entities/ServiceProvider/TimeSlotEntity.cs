using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Entities.ServiceProvider
{
    public class TimeSlotEntity: AuditedAggregateRoot<int>
    {
        public ServiceProviderEntity ServiceProvider { get; set; }
        public  virtual int ServiceProviderId { get; set; }
        public DateTime Time { get; set; }
    }
}
