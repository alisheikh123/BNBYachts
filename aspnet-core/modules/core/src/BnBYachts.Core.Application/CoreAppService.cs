using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Core.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core
{
    /* Inherit your application services from this class.
     */
    public abstract class CoreAppService : ApplicationService
    {
        protected CoreAppService()
        {
            LocalizationResource = typeof(CoreResource);
        }
    }
}
