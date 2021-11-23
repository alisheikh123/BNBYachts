using BnBYachts.Boat;
using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BnBYachts.Interfaces.Boat
{
    public interface IHostBoatService : ICrudAppService<BoatDto, int, PagedAndSortedResultRequestDto, BoatDto>
    {

    }
}
