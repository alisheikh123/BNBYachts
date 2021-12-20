
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Charter.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Charter.Interface
{
    public interface ICharterManager
    {
        Task<ICollection<BoatDTO>> BoatList(Guid? userId);
        Task<ICollection<CharterDto>> BookedCharter(int boatId);
        Task<CharterDto> InsertCharter(CharterDto charterForm);
    }
}
