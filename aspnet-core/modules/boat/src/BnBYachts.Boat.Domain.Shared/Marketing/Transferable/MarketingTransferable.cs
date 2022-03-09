using BnBYachts.Boat.Interface;
using BnBYachts.Boat.Marketing.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Marketing.Transferable
{
    public class MarketingTransferable : IRequestable
    {
        public int Id { get; set; }
        public MarketingType MarketingTypeId { get; set; }
        public string LocalLaws { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
