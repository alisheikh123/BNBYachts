using BnBYachts.Core.Enum;
using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.ServiceProvider.Requestable
{
    public class ServiceProviderTypeCheckRequestable : IRequestable
    {
        public string UserId { get; set; }
        public ServiceProviderType ServiceProviderType { get; set; }
    }
}
