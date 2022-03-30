using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Interfaces.Charter
{
    public interface ICharterAppService
    {
        Task<ICollection<BoatDTO>> GetAllBoats();
        Task<CharterDto> InsertCharters(CharterDto charterDto);
        Task<ICollection<CharterDto>> GetBookedCharters(int id);
        Task<EntityResponseListModel<CharterDto>> GetCharters(int pageNo, int pageSize);
        Task<bool> UpdateCharter(ChartersMapperRequestable charterDetails);
        Task<bool> UpdateHostCharterStatus(long charterId);
        Task<bool> updateCharterLocation(CharterLocationRequestable charter);
        Task<EntityResponseModel> GetCharterDetailById(long charterId);
        Task<EntityResponseListModel<CharterDto>> GetChartersByBoatId(int boatId);
    }
}
