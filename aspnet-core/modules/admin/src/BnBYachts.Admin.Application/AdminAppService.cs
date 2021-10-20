using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Admin.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Admin
{
    /* Inherit your application services from this class.
     */
    public abstract class AdminAppService : ApplicationService
    {
        protected AdminAppService()
        {
            LocalizationResource = typeof(AdminResource);
        }
    }
}
