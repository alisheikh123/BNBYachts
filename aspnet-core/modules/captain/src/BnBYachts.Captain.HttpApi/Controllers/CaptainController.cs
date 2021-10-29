using BnBYachts.Captain.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Captain.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class CaptainController : AbpController
    {
        protected CaptainController()
        {
            LocalizationResource = typeof(CaptainResource);
        }
    }
}