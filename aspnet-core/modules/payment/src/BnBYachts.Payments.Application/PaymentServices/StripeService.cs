
using BnBYachts.Payments.Payments;
using BnBYachts.Payments.PaymentVM;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BnBYachts.Payments.PaymentServices
{
    public class StripeAccountService : ApplicationService
    {
        private readonly IRepository<UserCardInfo, Guid> _userCardRepository;
        private readonly IRepository<PaymentDetails, Guid> _userPaymentDetailsRepository;
        public StripeAccountService(IRepository<UserCardInfo, Guid> userCardRepository, IRepository<PaymentDetails, Guid> userPaymentDetailsRepository)
        {
            StripeConfiguration.ApiKey = "sk_test_51JjjR4IQmeuKTcwEPY0veVnt0GzKPdicOMKC0jRrQouRJQg18bMbu86kfPGcPbG8l1ETH6lHwWhlFT8kgX0pHL3j00GkdfQLDP";
            _userCardRepository = userCardRepository;
            _userPaymentDetailsRepository = userPaymentDetailsRepository;
        }


        [HttpGet]
        [Authorize]
        [Route("get-customers-cards")]
        public async Task<List<UserPaymentMethods>> GetCustomersCard()
        {
            var user = await _userCardRepository.FindAsync(res => res.UserId == CurrentUser.Id.ToString()).ConfigureAwait(false);
            var options = new PaymentMethodListOptions
            {
                Customer = user.CustomerId,
                Type = "card",
            };
            var service = new PaymentMethodService();
            try
            {
                StripeList<PaymentMethod> paymentMethods = service.List(
                    options
                  );
                List<UserPaymentMethods> userPaymentMethods = new List<UserPaymentMethods>();
                foreach (var item in paymentMethods)
                {
                    userPaymentMethods.Add(UserPaymentMethodsFactory.Contruct(item.Id, item.BillingDetails.Name, item.Card.Last4, false,item.Card.Brand));
                }
                return userPaymentMethods;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost]
        [Route("pay-amount")]
        public async Task<bool> Pay(BookingPaymentVM data)
        {
            data.UserId = CurrentUser.Id.ToString();
            var user = await _userCardRepository.FindAsync(res => res.UserId == data.UserId).ConfigureAwait(false);

            if (data.IsSaveNewPaymentMethod)
            {
                //Card Creation
                var cardOptions = new PaymentMethodCreateOptions
                {
                    Type = "card",
                    Card = new PaymentMethodCardOptions
                    {
                        Token = data.Token
                    }
                };
                var paymentMethodService = new PaymentMethodService();
                var cardResponse = paymentMethodService.Create(cardOptions);
                data.PaymentId = cardResponse.Id;
                //Card Attachment
                var attachOptions = new PaymentMethodAttachOptions
                {
                    Customer = user.CustomerId,
                };
                var attachService = new PaymentMethodService();
                attachService.Attach(
                  data.PaymentId,
                  attachOptions
                );
            }

            var options = new PaymentIntentCreateOptions
            {
                Amount = data.Amount * 100,
                Currency = "usd",
                PaymentMethodTypes = new List<string>
                    {
                        "card"
                    },
                Customer = user.CustomerId,
                PaymentMethod = data.PaymentId,
                Description = data.Description,
                Confirm = true,
                ReceiptEmail = "hanan.afzal@techverx.com"
            };
            var service = new PaymentIntentService();
            try
            {
                var response = service.Create(options);
                if (response.Status == "succeeded")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        [HttpGet]
        [Route("refund/{bookingId}/{refundAmount}")]
        public async Task<bool> RefundPayment(string bookingId, long refundAmount)
        {

            var paymentDetails = await _userPaymentDetailsRepository.FindAsync(res => res.BookingId == bookingId).ConfigureAwait(false);

            var options = new RefundCreateOptions
            {
                PaymentIntent = paymentDetails.PaymentId,
                Amount = refundAmount * 100,
                Reason = "requested_by_customer",
            };
            var service = new RefundService();
            var response = service.Create(options);
            if (response.Status == "succeeded")
            {
                return true;
            }
            else
            {
                return false;
            }
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
