﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat
{
    public class BoatCalendar : AuditedAggregateRoot<Guid>
    {
        public bool IsAvailable { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public virtual Guid HostBoatId { get; set; }
    }
}