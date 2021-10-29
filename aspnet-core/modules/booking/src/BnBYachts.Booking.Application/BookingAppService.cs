using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Booking.Localization;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking
{
    /* Inherit your application services from this class.
     */
    public abstract class BookingAppService : ApplicationService
    {
        protected BookingAppService()
        {
            LocalizationResource = typeof(BookingResource);
        }
    }
}
