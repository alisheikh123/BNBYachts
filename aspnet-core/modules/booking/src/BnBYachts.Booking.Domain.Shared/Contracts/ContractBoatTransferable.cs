using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Shared.Interface;
namespace BnBYachts.Booking.Contracts
{
    public class ContractBoatTransferable : ITransferable
    {
        public List<int> Ids { get; set; }
    }
}
