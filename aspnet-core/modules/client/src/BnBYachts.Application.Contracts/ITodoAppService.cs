using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts
{
    public interface ITodoAppService : IApplicationService
    {
        Task<List<string>> GetListAsync();

    }
}
