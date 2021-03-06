
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boats.Charter;
using BnBYachts.Charter.Interface;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager.Charter
{
    public class CharterManager : DomainService, ICharterManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<CharterEntity, int> _charterRepository;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        private readonly ILogger<ICharterManager> _logger;

        public CharterManager(IRepository<BoatEntity, int> boatRepository, IRepository<CharterEntity, int> charterRepository, IObjectMapper<BoatDomainModule> objectMapper, ILogger<ICharterManager> logger)
        {
            _boatRepository = boatRepository;
            _charterRepository = charterRepository;
            _objectMapper = objectMapper;
            _logger = logger;

        }

        public async Task<ICollection<BoatDTO>> BoatList(Guid? userId)
        {
            return _objectMapper.Map<ICollection<BoatEntity>, ICollection<BoatDTO>>(await _boatRepository.GetListAsync(x => x.CreatorId == userId).ConfigureAwait(false));
        }

        public async Task<ICollection<CharterDto>> BookedCharter(int boatId) => _objectMapper
            .Map<List<CharterEntity>, List<CharterDto>>(await _charterRepository.
                GetListAsync(x => x.BoatId == boatId && x.DepartureFromDate >= DateTime.Now.Date)
            .ConfigureAwait(false));

        public async Task<EntityResponseListModel<CharterDto>> GetCharters(Guid? userId, int pageNo, int pageSize)
        {
            var response = new EntityResponseListModel<CharterDto>();
            var charters = await _charterRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false);
            foreach (var charter in charters)
            {
                await _charterRepository.EnsurePropertyLoadedAsync(charter, res => res.Boat).ConfigureAwait(false);
                await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, res => res.BoatGalleries).ConfigureAwait(false);
            }
            var hostCharterList = _objectMapper.Map<List<CharterEntity>, List<CharterDto>>(charters);
            response.TotalCount = hostCharterList.Count;
            response.Data = await PagedList<CharterDto>.CreateAsync(hostCharterList, pageNo, pageSize);
            return response;
        }
        public async  Task<EntityResponseListModel<CharterDto>> GetChartersByBoatId(int boatId)
        {
            var response = new EntityResponseListModel<CharterDto>();
            var charters = await _charterRepository.GetListAsync(res => res.BoatId == boatId).ConfigureAwait(false);
            response.Data = _objectMapper.Map<List<CharterEntity>, List<CharterDto>>(charters);
            return response;

        }

        public async Task<CharterDto> InsertCharter(CharterDto charterForm)
        {
            var map = _objectMapper.Map<CharterDto, CharterEntity>(charterForm);
            await _charterRepository.InsertAsync(map, true).ConfigureAwait(false);
            return _objectMapper.Map<CharterEntity, CharterDto>(map);
        }
        public async Task<bool> UpdateCharter(ChartersMapperRequestable charterDetails, Guid? userId)
        {
            var charterEntity = await _charterRepository.FindAsync(x => x.Id == charterDetails.Id).ConfigureAwait(false);
            _objectMapper.Map<ChartersMapperRequestable, CharterEntity>(charterDetails, charterEntity);
            if (charterEntity != null)
            {
                charterEntity.CreatorId = userId;
                await _charterRepository.UpdateAsync(charterEntity, autoSave: true).ConfigureAwait(false);
                return true;
            }
            return false;
        }

        public async Task<bool> UpdateCharterStatus(long charterId)
        {
            var charter = await _charterRepository.FindAsync(x => x.Id == charterId).ConfigureAwait(false);
            charter.IsActive = !charter.IsActive;
            return true;

        }
        public async Task<bool> UpdateCharterLocation(CharterLocationRequestable charterDetails, Guid? userId)
        {
            var charterEntity = await _charterRepository.FindAsync(res => res.Id == charterDetails.Id).ConfigureAwait(false);
            _objectMapper.Map<CharterLocationRequestable, CharterEntity>(charterDetails, charterEntity);
            if (charterEntity != null)
            {
                charterEntity.LastModifierId = userId;
                charterEntity.LastModificationTime = DateTime.Now;
                await _charterRepository.UpdateAsync(charterEntity, autoSave: true).ConfigureAwait(false);
                _logger.LogInformation("Update the Location of Charter");
                return true;
            }
            return false;
        }

        public async Task<EntityResponseModel> GetCharterDetailById(long charterId)
        {
            var response = new EntityResponseModel();
            _logger.LogInformation("Get Charter Detail By Id");
            response.Data =  _objectMapper.Map<CharterEntity, CharterRequestable>(await _charterRepository.GetAsync(x => x.Id == charterId).ConfigureAwait(false));
            return response;
        }
    }
}
