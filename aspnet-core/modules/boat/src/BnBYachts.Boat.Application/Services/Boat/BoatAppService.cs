using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.Boat.Localization;
using BnBYachts.Boat.Shared.Boat.Interface;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat
{
    /* Inherit your application services from this class.
     */
    public class BoatAppService : ApplicationService
    {
        private readonly IHostBoatManager _hostBoatManager;
        public BoatAppService(IHostBoatManager hostBoatManager)
        {
            _hostBoatManager = hostBoatManager;
        }

        [Route("GetAllBoats")]
        [HttpGet]
        public async Task<ICollection<BoatEntity>> GetAllBoats()
        {
            return await _hostBoatManager.GetHostBoats(CurrentUser.Id).ConfigureAwait(false);
        }
    }
}
