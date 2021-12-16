using BnBYachts.Boat;
using BnBYachts.Boat.Boat.Transferables;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BnBYachts.Interfaces.Boat
{
    public interface IHostBoatService : ICrudAppService<BoatDTO, int, PagedAndSortedResultRequestDto, BoatDTO>
    {

    }
}
