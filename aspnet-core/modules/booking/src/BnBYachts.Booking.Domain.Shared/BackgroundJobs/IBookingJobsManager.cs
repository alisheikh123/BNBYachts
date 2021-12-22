using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.BackgroundJobs
{
    public interface IBookingJobsManager
    {
        Task RejectPendingBookings();
    }
}
