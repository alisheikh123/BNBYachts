using System.Threading.Tasks;

namespace BnBYachts.Payments.Data
{
    public interface IPaymentsDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
