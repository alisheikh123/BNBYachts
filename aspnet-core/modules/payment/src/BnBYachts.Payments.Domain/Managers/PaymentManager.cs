using BnBYachts.Payments.Payments;
using BnBYachts.Payments.Shared.Interface;
using BnBYachts.Payments.Shared.Transferable;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Payments.Managers
{
    public class PaymentManager : DomainService, IPaymentManager
    {
        private readonly IRepository<UserCardInfoEntity, int> _userCardRepository;
        private readonly IRepository<PaymentDetailsEntity, int> _userPaymentDetailsRepository;
        public PaymentManager(IRepository<UserCardInfoEntity, int> userCardRepository, IRepository<PaymentDetailsEntity, int> userPaymentDetailsRepository)
        {
            StripeConfiguration.ApiKey = "sk_test_51JjjR4IQmeuKTcwEPY0veVnt0GzKPdicOMKC0jRrQouRJQg18bMbu86kfPGcPbG8l1ETH6lHwWhlFT8kgX0pHL3j00GkdfQLDP";
            _userCardRepository = userCardRepository;
            _userPaymentDetailsRepository = userPaymentDetailsRepository;
        }

        public async Task<List<UserPaymentMethodTransferable>> GetCustomersCard(Guid? userId)
        {
            try
            {
                var user = await _userCardRepository.FindAsync(res => res.UserId == userId.ToString()).ConfigureAwait(false);
                var options = new PaymentMethodListOptions
                {
                    Customer = user.CustomerId,
                    Type = "card",
                };
                var service = new PaymentMethodService();
                StripeList<PaymentMethod> paymentMethods = service.List(
                    options
                  );

                var userPaymentMethods = new List<UserPaymentMethodTransferable>();
                foreach (var item in paymentMethods)
                {
                    userPaymentMethods.Add(UserPaymentMethodTransferableFactory.Contruct(item.Id, item.BillingDetails.Name, item.Card.Last4, false, item.Card.Brand));
                }
                return userPaymentMethods;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<bool> Pay(BookingPaymentRequestable data)
        {
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

        public async Task<bool> RefundPayment(int bookingId, long refundAmount)
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
    }
}
