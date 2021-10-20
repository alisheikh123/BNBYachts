using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts
{
    /* Inherit your application services from this class.
     */
    public abstract class BnBYachtsAppService : ApplicationService
    {
        protected BnBYachtsAppService()
        {
            LocalizationResource = typeof(BnBYachtsResource);
        }
    }
}
