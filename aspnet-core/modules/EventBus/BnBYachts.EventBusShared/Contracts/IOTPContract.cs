using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IOTPContract : IContractable
    {
        public string PhoneNumber { get; set; }
        public string OTPCode { get; set; }

    }
    public class OTPContract : IOTPContract
    {
        public string PhoneNumber { get; set; }
        public string OTPCode { get; set; }
    }
}
