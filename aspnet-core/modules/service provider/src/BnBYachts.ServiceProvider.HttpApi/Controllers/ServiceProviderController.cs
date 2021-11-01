using BnBYachts.ServiceProvider.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.ServiceProvider.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class ServiceProviderController : AbpController
    {
        protected ServiceProviderController()
        {
            LocalizationResource = typeof(ServiceProviderResource);
        }
    }
}