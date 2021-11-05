using BnBYachts.Boat;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BnBYachts.Interfaces.Boat
{
    public interface IHostBoatService : ICrudAppService<HostBoatDto, Guid, PagedAndSortedResultRequestDto, HostBoatDto>
    {

    }
}
