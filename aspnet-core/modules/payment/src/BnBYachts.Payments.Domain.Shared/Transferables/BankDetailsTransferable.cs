using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Payments.Transferables
{
    public class BankDetailsTransferable:ITransferable
    {
        public string AccountHolderName { get; set; }
        public string BankName { get; set; }
        public string AccountType { get; set; }
        public string Country { get; set; }
    }
}
