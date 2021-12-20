using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Interfaces.Boat;
using BnBYachts.Boat.Shared.Boat.Requestable;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Boat
{
    public class BoatSettingsAppService : ApplicationService, IBoatSettingsAppService
    {
        private readonly IBoatSettingsManager _boatSettingManager;
        public BoatSettingsAppService(IBoatSettingsManager boatSettingManager)
        {
            _boatSettingManager = boatSettingManager;
        }

        public async Task<bool> UpdateBoat(HostBoatRequestable boatDetails)
        {
            var response = await _boatSettingManager.UpdateBoat(boatDetails,CurrentUser.Id).ConfigureAwait(false);
            return response;
        }

    }
}
