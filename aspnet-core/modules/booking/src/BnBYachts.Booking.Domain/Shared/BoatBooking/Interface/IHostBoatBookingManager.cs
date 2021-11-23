using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Shared.BoatBooking.Interface
{
    public interface IHostBoatBookingManager
    {
       Task<bool> BoatelBooking(BoatelBookingEntity data, Guid? userId,string userName);
    }
}
