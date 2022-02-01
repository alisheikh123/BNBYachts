using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Interfaces.Boat;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Shared.Model;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Boat
{
    public class FindBoatsAppService : ApplicationService, IFindBoatsAppService
    {
        private readonly IFindBoatManager _manager;
        public FindBoatsAppService(IFindBoatManager manager)
        {
            _manager = manager;
        }
        public async Task<EntityResponseListModel<HostBoatRequestable>> FindUsBoats(double latitude, double longitude)
            => await _manager.FindUsBoats(latitude, longitude).ConfigureAwait(false);
    }
}
