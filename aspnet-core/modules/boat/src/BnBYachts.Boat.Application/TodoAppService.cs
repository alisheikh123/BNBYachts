using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Boat
{
    [Authorize]
    public class TodoAppService : ApplicationService, ITodoAppService
    {
       

        // TODO: Implement the methods here...
        public async Task<string> Get()
        {
            await Task.CompletedTask;
            return "its me";
        }
    }
}