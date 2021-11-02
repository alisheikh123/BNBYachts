using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts
{
    [Authorize]
    public class TodoAppService : ApplicationService, ITodoAppService
    {
        

        // TODO: Implement the methods here...
        public async Task<List<string>> GetListAsync()
        {
            await Task.CompletedTask;
            return new List<string>{"umar"};

        }
    }
}