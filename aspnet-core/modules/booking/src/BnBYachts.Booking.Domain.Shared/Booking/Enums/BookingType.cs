
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Booking.Booking
{
    public enum BookingType
    {
        Boatel = 1,
        Charter = 2,
        Event = 3
    }
    public enum BookingResponseFilter
    {
        All=0,
        Upcomings= 1,
        Past = 2
    }
}
