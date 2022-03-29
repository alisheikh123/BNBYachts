using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Disputes.Interface
{
    public interface IDisputeManager
    {
        Task AddDispute(DisputeRequestableDto data);
        Task<string> GetEmailContent(int templateId);
        Task<List<DisputeTransferable>> GetDisputeList();
        Task<DisputeTransferable> GetDisputebyId(int id);
        Task<bool> ChangeDisputeStatus(ChangeStatusRequestable status);



    }
}
