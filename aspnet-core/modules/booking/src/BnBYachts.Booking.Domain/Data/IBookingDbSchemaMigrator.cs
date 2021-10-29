using System.Threading.Tasks;

namespace BnBYachts.Booking.Data
{
    public interface IBookingDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
