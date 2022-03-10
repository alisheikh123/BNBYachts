using BnBYachts.Payments.Requestables;
using BnBYachts.Payments.Shared.Interface;
using BnBYachts.Payments.Shared.Requestable;
using BnBYachts.Payments.Shared.Transferable;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Payments.PaymentServices
{
    public class StripeAccountService : ApplicationService
    {
        private readonly IPaymentManager _paymentManager;
        public StripeAccountService(IPaymentManager paymentManager)
        {
            _paymentManager = paymentManager;
        }
        [HttpGet]
        [Authorize]
        public async Task<List<UserPaymentMethodTransferable>> GetCustomersCard()
        {
            var data = await _paymentManager.GetCustomersCard(CurrentUser.Id);
            return data;
        }
        [HttpPost]
        public async Task<bool> CreateCustomer(StripeCustomerRequestable customerRequestable)
        {
            var result = await _paymentManager.CreateCustomer(customerRequestable);
            return result;
        }

        [HttpPost]
        public async Task<bool> Pay(BookingPaymentRequestable data)
        {
            data.UserId = CurrentUser.Id.ToString();
            var response = await _paymentManager.Pay(data);
            return response;
        }

        [HttpGet]
        public async Task<bool> RefundPayment(int bookingId, long refundAmount)
        {
            var response = await _paymentManager.RefundPayment(bookingId, refundAmount);
            return response;
        }

        public async Task CreateConnectAccount(StripeOnboardingRequestable data)
        {
            data.FirstName = CurrentUser.Name.Trim();
            data.LastName = CurrentUser.Name.Trim();
            data.Email = CurrentUser.Email;
            await _paymentManager.CreateAccount(data, CurrentUser.Id.ToString());
        }

        public async Task<string> GetAccountDetails()
          => await _paymentManager.GetAccountDetails(CurrentUser.Id.ToString()).ConfigureAwait(false);
        public async Task SendToBankAmount(string accountId, int amount)
        {
            await _paymentManager.SendToBankAmount(accountId, amount);
        }
        public async Task<EntityResponseModel> CalculateFunds(List<BookingsRequestable> data)
            => await _paymentManager.CalculateFunds(data).ConfigureAwait(false);

        public async Task<StripeList<BalanceTransaction>> GetTransactionDetails(string accountId)
        {
            return await _paymentManager.GetTransactionDetails(accountId).ConfigureAwait(false);
        }

        public async Task<string> GetCustomerTransactions()
        {
            return await _paymentManager.GetCustomerTransactions(CurrentUser.Id.ToString()).ConfigureAwait(false);
        }
    }
}
