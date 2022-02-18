using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Disputes.Interface
{
    public interface IDisputeManager
    {
        Task AddDispute(DisputeRequestableDto data);
        Task<string> GetEmailContent(int templateId);
        //Task<EntityResponseListModel<DisputeTransferable>> GetDisputeList(string SearchText, PaginationHeader pagination);
        Task<List<DisputeTransferable>> GetDisputeList();
        Task<DisputeTransferable> GetDisputebyId(int id);


    }
}
