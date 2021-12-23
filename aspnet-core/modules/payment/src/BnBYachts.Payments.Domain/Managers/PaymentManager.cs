using BnBYachts.Payments.Enum;
using BnBYachts.Payments.Payments;
using BnBYachts.Payments.Shared.Interface;
using BnBYachts.Payments.Shared.Requestable;
using BnBYachts.Payments.Shared.Transferable;
using Stripe;
using System;
using System.Collections.Generic;
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
            //var configurationBuilder = new ConfigurationBuilder()
            //             .SetBasePath(Directory.GetCurrentDirectory())
            //             .AddJsonFile("appsettings.json", optional: false).Build();

            //StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("BNB_STRIPE_APIKEY", EnvironmentVariableTarget.Machine);//"sk_test_51JjjR4IQmeuKTcwEPY0veVnt0GzKPdicOMKC0jRrQouRJQg18bMbu86kfPGcPbG8l1ETH6lHwWhlFT8kgX0pHL3j00GkdfQLDP";//configurationBuilder.GetSection("Stripe")["ApiKey"].ToString();
            StripeConfiguration.ApiKey = "sk_test_51JjjR4IQmeuKTcwEPY0veVnt0GzKPdicOMKC0jRrQouRJQg18bMbu86kfPGcPbG8l1ETH6lHwWhlFT8kgX0pHL3j00GkdfQLDP";//configurationBuilder.GetSection("Stripe")["ApiKey"].ToString();
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
        public async Task<bool> CreateCustomer(StripeCustomerRequestable data)
        {
            var customerOptions = new CustomerCreateOptions
            {
                Description = "Customer created for future payments",
                Name = data.Name,
                Email = data.Email,
                Validate = true
            };
            var customerService = new CustomerService();
            var customerResponse = await customerService.CreateAsync(customerOptions);
            var userCardEntity = new UserCardInfoEntity
            {
                UserId = data.Id,
                CustomerId = customerResponse.Id
            };
            var result = await _userCardRepository.InsertAsync(userCardEntity).ConfigureAwait(false);
            return true;
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
                    BookingId = data.BookingId ?? 0,
                    PaymentId = response.Id,
                    CustomerId = user.CustomerId,
                    Amount = data.Amount
                };
                await _userPaymentDetailsRepository.InsertAsync(pm);
                return true;
            }
            return false;
        }

        public async Task<bool> RefundPayment(int bookingId, long refundAmount)
        {
            var paymentDetails = await _userPaymentDetailsRepository.FindAsync(res => res.BookingId == bookingId).ConfigureAwait(false);

            var options = new RefundCreateOptions
            {
                PaymentIntent = paymentDetails.PaymentId,
                Amount = refundAmount,
                Reason = PaymentConstants.RefundReason,
            };
            var service = new RefundService();
            var response = service.Create(options);

            return (response.Status == PaymentConstants.StatusSucceed) ? true : false;

        }
    }
}
