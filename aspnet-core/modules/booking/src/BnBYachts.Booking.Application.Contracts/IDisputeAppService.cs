using BnBYachts.Booking.Disputes;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking
{
    public interface IDisputeAppService
    {
        Task AddDispute(DisputeRequestableDto data);
        //Task<EntityResponseListModel<DisputeTransferable>> GetDisputeList(string SearchText, PaginationHeader pagination);
        Task<List<DisputeTransferable>> GetDisputeList();

    }
}
