using BnBYachts.Payments.Shared.Transferable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Payments.Shared.Interface
{
    public interface IPaymentManager:IDomainService
    {
        Task<List<UserPaymentMethodTransferable>> GetCustomersCard(Guid? userId);
        Task<bool> Pay(BookingPaymentRequestable data);
        Task<bool> RefundPayment(int bookingId, long refundAmount);

    }
}
