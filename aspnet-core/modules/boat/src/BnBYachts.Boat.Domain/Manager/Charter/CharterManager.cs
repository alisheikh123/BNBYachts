
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boats.Charter;
using BnBYachts.Charter.Interface;
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

        public CharterManager(IRepository<BoatEntity, int> boatRepository, IRepository<CharterEntity, int> charterRepository, IObjectMapper<BoatDomainModule> objectMapper)
        {
            _boatRepository = boatRepository;
            _charterRepository = charterRepository;
            _objectMapper = objectMapper;

        }

        public async Task<ICollection<BoatDTO>> BoatList(Guid? userId)
        {
            return _objectMapper.Map<ICollection<BoatEntity>, ICollection<BoatDTO>>(await _boatRepository.GetListAsync(x => x.CreatorId == userId).ConfigureAwait(false));
        }

        public async Task<ICollection<CharterDto>> BookedCharter(int boatId) => _objectMapper
            .Map<List<CharterEntity>, List<CharterDto>>(await _charterRepository.
                GetListAsync(x => x.BoatId == boatId && x.DepartureFromDate >= DateTime.Now.Date)
            .ConfigureAwait(false));

        public async Task<ICollection<CharterDto>> GetCharters(Guid? userId)
        {
            var charters = await _charterRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false);
            foreach (var charter in charters)
            {
                await _charterRepository.EnsurePropertyLoadedAsync(charter, res => res.Boat).ConfigureAwait(false);
                await _boatRepository.EnsureCollectionLoadedAsync(charter.Boat, res => res.BoatGalleries).ConfigureAwait(false);
            }
            return _objectMapper.Map<ICollection<CharterEntity>, ICollection<CharterDto>>(charters);
        }

        public async Task<CharterDto> InsertCharter(CharterDto charterForm)
        {
           await _charterRepository.InsertAsync(_objectMapper.Map<CharterDto, CharterEntity>(charterForm),true).ConfigureAwait(false);
            return new CharterDto();
        }


    }
}
