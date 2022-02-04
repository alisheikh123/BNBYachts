using System.Threading.Tasks;

namespace BnBYachts.Booking.Disputes.Interface
{
    public interface IDisputeManager
    {
        Task AddDispute(DisputeRequestableDto data);
        Task<string> GetEmailContent(int templateId);
    }
}
