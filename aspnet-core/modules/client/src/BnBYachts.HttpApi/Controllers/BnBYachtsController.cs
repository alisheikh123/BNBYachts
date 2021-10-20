using BnBYachts.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BnBYachts.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class BnBYachtsController : AbpController
    {
        protected BnBYachtsController()
        {
            LocalizationResource = typeof(BnBYachtsResource);
        }
    }
}