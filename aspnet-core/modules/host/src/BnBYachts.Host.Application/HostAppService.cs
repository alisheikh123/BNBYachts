using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Host.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Host
{
    /* Inherit your application services from this class.
     */
    public abstract class HostAppService : ApplicationService
    {
        protected HostAppService()
        {
            LocalizationResource = typeof(HostResource);
        }
    }
}
