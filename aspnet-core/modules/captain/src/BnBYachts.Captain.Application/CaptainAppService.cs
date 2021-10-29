using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Captain.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Captain
{
    /* Inherit your application services from this class.
     */
    public abstract class CaptainAppService : ApplicationService
    {
        protected CaptainAppService()
        {
            LocalizationResource = typeof(CaptainResource);
        }
    }
}
