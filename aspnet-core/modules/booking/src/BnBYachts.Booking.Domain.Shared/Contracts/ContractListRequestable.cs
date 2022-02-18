using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Contracts
{
    public class ContractListRequestable
    {
        public int? BoatId { get; set; }
        public int? StatusId { get; set; }
        public int? ServiceType { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public bool isHost { get; set; }

    }
}
