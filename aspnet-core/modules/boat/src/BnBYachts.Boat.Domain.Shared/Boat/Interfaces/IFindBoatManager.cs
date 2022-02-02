using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Boat.Interfaces
{
    public interface IFindBoatManager
    {
        Task<EntityResponseListModel<HostBoatRequestable>> FindUsBoats(double latitude, double longitude);
    }
}
