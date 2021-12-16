using System;

namespace BnBYachts.Shared.Model
{
    public class EntityMessageSearchModel
    {
        public string Payload { get; set; }
        public string ExchangeName { get; set; }
        public string QueueName { get; set; }
        public Guid MessageGuid { get; set; }
    }
}