using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Shared.Enums
{
    public enum BookingType
    {
        Boatel = 0,
        Charter = 1,
        Event = 2
    }
    public enum BookingResponseFilter
    {
        All=0,
        Upcomings= 1,
        Past = 2
    }
}
