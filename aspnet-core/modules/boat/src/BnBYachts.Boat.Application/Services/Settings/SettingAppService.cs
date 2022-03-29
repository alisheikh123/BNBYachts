using BnBYachts.Boat.Interfaces.Settings;
using BnBYachts.Boat.Settings;
using BnBYachts.Boat.Settings.Enum;
using BnBYachts.Boat.Settings.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Settings
{
    public class SettingAppService : ApplicationService, ISettingAppService
    {
        private readonly ISettingManager _manager;
        public SettingAppService(ISettingManager manager) => _manager = manager;

        public async Task<EntityResponseModel> AddServiceFee(SettingTransferable setting)
             => await _manager.AddServiceFee(setting);

        public async Task DeleteServicesfee(int id)
            => await _manager.DeleteServicesfee(id);

        public async Task<EntityResponseModel> getserviceFeeByBoatType(BoatType BoatTypeId)
               => await _manager.getserviceFeeByBoatType(BoatTypeId).ConfigureAwait(false);

        public async Task<List<SettingTransferable>> GetServiceFees()
             => await _manager.GetServiceFees().ConfigureAwait(false);

        public async Task<EntityResponseModel> UpdateServicesFee(SettingTransferable setting)
              => await _manager.UpdateServicesFee(setting).ConfigureAwait(false);
    }
}
