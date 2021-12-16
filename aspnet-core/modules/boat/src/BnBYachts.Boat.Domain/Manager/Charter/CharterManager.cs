
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boats.Charter;
using BnBYachts.Charter.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<ICollection<BoatDto>> BoatList(Guid? userId)
        {
            return _objectMapper.Map<ICollection<BoatEntity>, ICollection<BoatDto>>(await _boatRepository.GetListAsync(x => x.CreatorId == userId).ConfigureAwait(false));
        }

        public async Task<ICollection<CharterDto>> BookedCharter(int boatId) => _objectMapper
            .Map<List<CharterEntity>, List<CharterDto>>(await _charterRepository.
                GetListAsync(x => x.BoatId == boatId && x.DepartureFromDate >= DateTime.Now.Date)
            .ConfigureAwait(false));


        [HttpPost]
        public async Task<CharterDto> InsertCharter(CharterDto charterForm)
        {
           await _charterRepository.InsertAsync(_objectMapper.Map<CharterDto, CharterEntity>(charterForm),true).ConfigureAwait(false);
            return new CharterDto();
        }


    }
}
