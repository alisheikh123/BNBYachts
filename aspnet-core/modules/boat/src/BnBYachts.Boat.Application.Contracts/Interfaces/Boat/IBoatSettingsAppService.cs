using BnBYachts.Boat.Shared.Boat.Requestable;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Interfaces.Boat
{
    public interface IBoatSettingsAppService
    {
        Task<bool> UpdateBoat(HostBoatRequestable boatDetails);
    }
}
