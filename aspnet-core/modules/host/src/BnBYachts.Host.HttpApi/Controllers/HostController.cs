using BnBYachts.Host.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Host.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class HostController : AbpController
    {
        protected HostController()
        {
            LocalizationResource = typeof(HostResource);
        }
    }
}