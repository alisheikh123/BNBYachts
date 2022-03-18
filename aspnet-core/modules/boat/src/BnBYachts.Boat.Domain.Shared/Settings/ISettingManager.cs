using BnBYachts.Boat.Settings.Enum;
using BnBYachts.Boat.Settings.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Settings
{
    public interface ISettingManager
    {
        Task<EntityResponseModel> AddServiceFee(SettingTransferable setting);
        Task DeleteServicesfee(int id);
        Task<List<SettingTransferable>> GetServiceFees();
        Task<EntityResponseModel> UpdateServicesFee(SettingTransferable setting);
        Task<EntityResponseModel> getserviceFeeByBoatType(BoatType BoatTypeId);
    }
}
