using BnBYachts.Boat.Settings.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Boat.Boat.Settings
{
    public class SettingEntity : AuditedAggregateRoot<int>, IBoatAggregate
    {
        public BoatType BoatTypeId { get; set; }
        public string ServiceFee { get; set; }
    }
}
