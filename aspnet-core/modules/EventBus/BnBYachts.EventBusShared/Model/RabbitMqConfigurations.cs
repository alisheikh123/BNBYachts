using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Model
{
    public class RabbitMqConfigurations
    {
        public string Host { get; set; }
        public string VirtualHost { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
