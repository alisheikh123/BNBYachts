using BnBYachts.Boat.Shared.Boat.Requestable;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Boat.Interfaces
{
    public interface IBoatSettingsManager
    {
        Task<bool> UpdateBoat(HostBoatRequestable boatDetails,Guid? userId);
    }
}
