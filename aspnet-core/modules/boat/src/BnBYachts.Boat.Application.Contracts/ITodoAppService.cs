using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat
{
    public interface ITodoAppService : IApplicationService
    {
        Task<string> Get();
    }
}
