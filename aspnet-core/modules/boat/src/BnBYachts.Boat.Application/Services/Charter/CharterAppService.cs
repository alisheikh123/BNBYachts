
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using BnBYachts.Boat.Interfaces.Charter;
using BnBYachts.Charter.Interface;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Boat.Transferables;

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

       

        public async Task<CharterDto> InsertCharters(CharterDto charterDto)=>
            await _charterManager.InsertCharter(charterDto).ConfigureAwait(false);

      
    }
}
