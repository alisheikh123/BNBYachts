using BnBYachts.Booking.Disputes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking
{
    public interface IDisputeAppService
    {
        Task AddDispute(DisputeRequestableDto data);
    }
}
