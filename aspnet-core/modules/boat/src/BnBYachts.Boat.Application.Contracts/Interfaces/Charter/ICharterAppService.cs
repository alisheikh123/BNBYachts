﻿using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Charter.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Interfaces.Charter
{
    public interface ICharterAppService
    {
        Task<ICollection<BoatDTO>> GetAllBoats();
        Task<CharterDto> InsertCharters(CharterDto charterDto);
        Task<ICollection<CharterDto>> GetBookedCharters(int id);
    }
}
