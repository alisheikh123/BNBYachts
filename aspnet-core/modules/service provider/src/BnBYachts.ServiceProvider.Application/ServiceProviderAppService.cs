using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.ServiceProvider.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.ServiceProvider
{
    /* Inherit your application services from this class.
     */
    public abstract class ServiceProviderAppService : ApplicationService
    {
        protected ServiceProviderAppService()
        {
            LocalizationResource = typeof(ServiceProviderResource);
        }
    }
}
