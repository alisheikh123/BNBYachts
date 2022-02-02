using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Interfaces.Boat
{
    public interface IFindBoatsAppService:IApplicationService
    {
        Task<EntityResponseListModel<HostBoatRequestable>> FindUsBoats(double latitude, double longitude);
    }
}
