using BnBYachts.Boat.Boat.Settings;
using BnBYachts.Boat.Settings;
using BnBYachts.Boat.Settings.Enum;
using BnBYachts.Boat.Settings.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager.Settings
{
    public class SettingManager : DomainService, ISettingManager
    {
        private readonly IRepository<SettingEntity, int> _repository;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        public SettingManager(IRepository<SettingEntity, int> repository, IObjectMapper<BoatDomainModule> objectMapper)
        {
            _repository = repository;
            _objectMapper = objectMapper;
        }

        public async Task<EntityResponseModel> AddServiceFee(SettingTransferable setting)
            => new EntityResponseModel { Data = await _repository.InsertAsync(_objectMapper.Map<SettingTransferable, SettingEntity>(setting)).ConfigureAwait(false) };
        public async Task DeleteServicesfee(int id) => await _repository.DeleteAsync(id);
        public async Task<EntityResponseModel> getserviceFeeByBoatType(BoatType BoatTypeId)
            => new EntityResponseModel { Data = _objectMapper.Map<SettingEntity, SettingTransferable>(await _repository.FirstOrDefaultAsync(x => x.BoatTypeId == BoatTypeId).ConfigureAwait(false)) };
        public async Task<List<SettingTransferable>> GetServiceFees()
            => _objectMapper.Map<List<SettingEntity>, List<SettingTransferable>>(await _repository.GetListAsync().ConfigureAwait(false));
        public async Task<EntityResponseModel> UpdateServicesFee(SettingTransferable setting)
            => new EntityResponseModel { Data = await _repository.UpdateAsync(_objectMapper.Map<SettingTransferable, SettingEntity>(setting, await _repository.GetAsync(x => x.Id == setting.Id).ConfigureAwait(false))) };
    }
}