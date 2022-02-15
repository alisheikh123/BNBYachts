
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Boat.Interfaces.Charter;
using BnBYachts.Charter.Interface;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Shared.Model;
using BnBYachts.Boat.Shared.Boat.Requestable;

namespace BnBYachts.Services.Charter
{
    public class CharterAppService : ApplicationService,ICharterAppService
    {
        private readonly ICharterManager _charterManager;
       

        public CharterAppService(ICharterManager charterManager)
        {
            _charterManager = charterManager;
        }
        public async Task<ICollection<BoatDTO>> GetAllBoats()=>
            await _charterManager.BoatList(CurrentUser.Id).ConfigureAwait(false);
        public async Task<ICollection<CharterDto>> GetBookedCharters(int boatId)=> 
            await _charterManager.BookedCharter(boatId).ConfigureAwait(false);

        public async Task<EntityResponseListModel<CharterDto>> GetCharters(int pageNo, int pageSize) => await _charterManager.GetCharters(CurrentUser.Id,pageNo,pageSize).ConfigureAwait(false);

        public async Task<CharterDto> InsertCharters(CharterDto charterDto)=>
            await _charterManager.InsertCharter(charterDto).ConfigureAwait(false);
        public async Task<bool> UpdateCharter(ChartersMapperRequestable charterDetails)
        {
            var response = await _charterManager.UpdateCharter(charterDetails, CurrentUser.Id).ConfigureAwait(false);
            return response;
        }

        public async Task<bool> UpdateHostCharterStatus(long charterId)
        {
            var charterStatus = await _charterManager.UpdateCharterStatus(charterId).ConfigureAwait(false);
            return charterStatus;
        }
        public async Task<bool> updateCharterLocation(CharterLocationRequestable charter)=>
             await _charterManager.UpdateCharterLocation(charter, CurrentUser.Id);

        public async Task<CharterRequestable> GetCharterDetailById(long charterId)
        {
            return await _charterManager.GetCharterDetailById(charterId);
        }
    }
}
