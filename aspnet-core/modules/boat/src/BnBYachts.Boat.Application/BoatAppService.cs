using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Boat.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat
{
    /* Inherit your application services from this class.
     */
    public abstract class BoatAppService : ApplicationService
    {
        protected BoatAppService()
        {
            LocalizationResource = typeof(BoatResource);
        }
    }
}
