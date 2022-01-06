using BnBYachts.Payments.Shared.Interface;
using BnBYachts.Payments.Shared.Requestable;
using BnBYachts.Payments.Shared.Transferable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        [Route("api/get-customers-cards")]
        public async Task<List<UserPaymentMethodTransferable>> GetCustomersCard()
        {
            var data = await _paymentManager.GetCustomersCard(CurrentUser.Id);
            return data;
        }
        [HttpPost]
        [Route("api/create-customer")]
        public async Task<bool> CreateCustomer(StripeCustomerRequestable customerRequestable)
        {
            var result = await _paymentManager.CreateCustomer(customerRequestable);
            return result;
        }

        [HttpPost]
        [Route("api/pay-amount")]
        public async Task<bool> Pay(BookingPaymentRequestable data)
        {
            data.UserId = CurrentUser.Id.ToString();
            var response = await _paymentManager.Pay(data);
            return response;
        }

        [HttpGet]
        [Route("api/refund/{bookingId}/{refundAmount}")]
        public async Task<bool> RefundPayment(int bookingId, long refundAmount)
        {
            var response = await _paymentManager.RefundPayment(bookingId, refundAmount);
            return response;
        }

        //public void CreateAccount(Account account)
        //{
        //    StripeConfiguration.ApiKey = "pk_test_51JjjR4IQmeuKTcwEUxVurdeswUrX0kjd0thsgPIYZpOiuPm7wf2XdKjWBjU2FtsT8PGjxmj7lCXU7QPA35qXuRPY00YGIKhP5f";

        //    var options = new AccountCreateOptions
        //    {
        //        Type = account.BusinessType,
        //        Country = account.Country,
        //        Email = account.Email,
        //        Capabilities = new AccountCapabilitiesOptions
        //        {
        //            CardPayments = new AccountCapabilitiesCardPaymentsOptions
        //            {
        //                Requested = true,
        //            },
        //            Transfers = new AccountCapabilitiesTransfersOptions
        //            {
        //                Requested = true,
        //            },
        //        },
        //    };
        //    var service = new AccountService();
        //    service.Create(options);
        //}
    }
}
