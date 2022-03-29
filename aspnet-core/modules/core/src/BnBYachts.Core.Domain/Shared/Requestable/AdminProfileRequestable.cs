using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Requestable
{
    public class AdminProfileRequestable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string About { get; set; }
        public string PhoneNumber { get; set; }
    }
}