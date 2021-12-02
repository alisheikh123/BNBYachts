using BnBYachts.Payments.Enum;
using BnBYachts.Payments.Payments;
using BnBYachts.Payments.Shared.Interface;
using BnBYachts.Payments.Shared.Transferable;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.IO;
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
            var configurationBuilder = new ConfigurationBuilder()
                         .SetBasePath(Directory.GetCurrentDirectory())
                         .AddJsonFile("appsettings.json", optional: false).Build();

            StripeConfiguration.ApiKey = configurationBuilder.GetSection("Stripe")["ApiKey"].ToString();
            _userCardRepository = userCardRepository;
            _userPaymentDetailsRepository = userPaymentDetailsRepository;
        }

        public async Task<List<UserPaymentMethodTransferable>> GetCustomersCard(Guid? userId)
        {
            var user = await _userCardRepository.FindAsync(res => res.UserId == userId.ToString()).ConfigureAwait(false);
            var options = new PaymentMethodListOptions
            {
                Customer = user.CustomerId,
                Type = PaymentConstants.Card,
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

        public async Task<bool> Pay(BookingPaymentRequestable data)
        {
            var user = await _userCardRepository.FindAsync(res => res.UserId == data.UserId).ConfigureAwait(false);

            if (data.IsSaveNewPaymentMethod)
            {
                var cardOptions = new PaymentMethodCreateOptions
                {
                    Type = PaymentConstants.Card,
                    Card = new PaymentMethodCardOptions
                    {
                        Token = data.Token
                    }
                };

                var paymentMethodService = new PaymentMethodService();
                var cardResponse = await paymentMethodService.CreateAsync(cardOptions).ConfigureAwait(false);
                data.PaymentId = cardResponse.Id;

                var attachOptions = new PaymentMethodAttachOptions
                {
                    Customer = user.CustomerId,
                };
                var attachService = new PaymentMethodService();
                await attachService.AttachAsync(
                  data.PaymentId,
                  attachOptions
                ).ConfigureAwait(false);
            }

            var options = new PaymentIntentCreateOptions
            {
                Amount = data.Amount * 100,
                Currency = PaymentConstants.Currency,
                PaymentMethodTypes = new List<string>
                    {
                        PaymentConstants.Card
                    },
                Customer = user.CustomerId,
                PaymentMethod = data.PaymentId,
                Description = data.Description,
                Confirm = true
            };
            var service = new PaymentIntentService();

            var response = service.Create(options);
            if (response.Status == PaymentConstants.StatusSucceed)
            {
                PaymentDetailsEntity pm = new PaymentDetailsEntity
                {
                    BookingId = data.BookingId,
                    PaymentId = response.Id,
                    CustomerId = user.CustomerId,
                    Amount = data.Amount
                };
                await _userPaymentDetailsRepository.InsertAsync(pm);
                return true;
                }
                else
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
                Reason = PaymentConstants.RefundReason,
            };
            var service = new RefundService();
            var response = service.Create(options);

            return (response.Status == PaymentConstants.StatusSucceed) ? true : false;

        }
    }
}
