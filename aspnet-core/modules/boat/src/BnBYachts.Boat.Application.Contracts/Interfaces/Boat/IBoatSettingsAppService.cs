using BnBYachts.Boat.Shared.Boat.Requestable;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Interfaces.Boat
{
    public interface IBoatSettingsAppService:IApplicationService
    {
        Task<bool> UpdateBoat(HostBoatRequestable boatDetails);
    }
}
