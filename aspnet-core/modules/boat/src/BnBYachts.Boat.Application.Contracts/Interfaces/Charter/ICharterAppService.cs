using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Interfaces.Charter
{
    public interface ICharterAppService
    {
        Task<ICollection<BnBYachts.Boat.Charter.Dto.BoatDto>> GetAllBoats();
        Task<BnBYachts.Boat.Charter.Dto.CharterDto> InsertCharters(BnBYachts.Boat.Charter.Dto.CharterDto charterDto);
        Task<ICollection<BnBYachts.Boat.Charter.Dto.CharterDto>> GetBookedCharters(int id);
    }
}
