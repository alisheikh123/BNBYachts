using BnBYachts.Payments.Requestables;
using BnBYachts.Payments.Shared.Requestable;
using BnBYachts.Payments.Shared.Transferable;
using BnBYachts.Shared.Model;
using Stripe;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Payments.Shared.Interface
{
    public interface IPaymentManager : IDomainService
    {
        Task<List<UserPaymentMethodTransferable>> GetCustomersCard(Guid? userId);
        Task<bool> CreateCustomer(StripeCustomerRequestable data);
        Task<bool> Pay(BookingPaymentRequestable data);
        Task<bool> RefundPayment(int bookingId, long refundAmount);
        Task CreateAccount(StripeOnboardingRequestable data,string userId);
        Task<EntityResponseModel> CalculateFunds(List<BookingsRequestable> data);
        Task<string> GetAccountDetails(string userId);
        Task SendToBankAmount(string accountId, int amount);
        Task<StripeList<BalanceTransaction>> GetTransactionDetails (string accountId);
        Task<string> GetCustomerTransactions(string userId);
    }
}
